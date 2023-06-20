export class TransferModel {
  constructor(
    public recipient: string,
    public amount: number,
  ) {
    this.recipient = recipient;
    this.amount = amount;
  }
}
