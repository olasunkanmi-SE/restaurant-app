import { Logger, NotFoundException } from '@nestjs/common';
import {
  Connection,
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  protected abstract readonly logger: Logger;
  constructor(
    protected readonly entityModel: Model<T>,
    private readonly connection: Connection,
  ) {}

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
  ): Promise<T | null> {
    const doc = await this.entityModel.findOne(filterQuery, projection).exec();
    if (!doc) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return doc;
  }

  async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[] | null> {
    return await this.entityModel.find(filter, projection, options).exec();
  }

  async create(document: any, options?: SaveOptions): Promise<T> {
    const createdDocument = new this.entityModel({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save(options)).toJSON() as unknown as T;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: Partial<{ lean: boolean; upsert: boolean; new: boolean }>,
  ): Promise<T | null> {
    options = { new: true };
    const doc = this.entityModel.findOneAndUpdate(filterQuery, update, options);
    if (!doc) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return doc;
  }

  async deleteMany(filter: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(filter);
    return deleteResult.deletedCount >= 1;
  }

  async upsert(
    filterQuery: FilterQuery<T>,
    document: Partial<T>,
  ): Promise<T | null> {
    return await this.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
