export class TransactionModel {

  // "id": 4,
  //  "transactionId": "d2593ee5-7a42-46df-92cc-b948c9ccd45e",
  //  "transactionType": "Credit",
  //  "accountId": "4735",
  //  "timestamp": 1687205334790
  
  constructor(
    public id : number, 
    public transactionId: string, 
    public transactionType : string, 
    public accountId : number,
    public timestamp: Date, 
    public amount: number) {
      this.id = id;
      this.transactionId= transactionId;
      this.transactionType= transactionType;
      this.accountId=accountId;
      this.timestamp=timestamp;
      this.amount=amount;
  }
}