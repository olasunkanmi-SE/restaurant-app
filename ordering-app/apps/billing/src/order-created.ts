export class OrderCreated {
  constructor(
    public readonly name: string,
    public readonly price: string,
    public readonly phoneNumber: number,
  ) {}
}
