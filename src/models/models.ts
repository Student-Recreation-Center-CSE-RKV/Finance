export interface IMsi extends Document {
  CategoryName: string;
  PaymentMode: string;
  BankReferenceNo: string;
  TransactionDate: Date;
  Amount: number;
  Status: string;
  Date: String;
  NameoftheStudent: string;
  ClassAndYear: string;
  IDNo: string;
  OnAccountOf: string;
  AmountPaidRs: String;
  AmountInWords: string;
  Remarks?: string;
  isVerified?: Boolean;
}
export interface IStudent extends Document {
  ID: string;
  // HallTicket: string;
  StudentName: string;
  Gender: string;
  Category: string;
  // DOB: Date;
  FatherName: string;
  BATCH: string;
}

export interface IBankMs extends Document {
  DueNo?: string;
  Credit?: number;
  Debit?: number;
}
