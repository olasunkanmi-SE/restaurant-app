export class OrderCreatedEvent {
  constructor(
    public readonly name: string,
    public readonly price: string,
    public readonly phoneNumber: number,
  ) {}

  toString() {
    return JSON.stringify({
      name: this.name,
      price: this.price,
      phoneNumber: this.phoneNumber,
    });
  }
}
