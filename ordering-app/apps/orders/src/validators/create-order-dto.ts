import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  readonly name;

  @IsNumber()
  @IsNotEmpty()
  readonly price;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber;
}
