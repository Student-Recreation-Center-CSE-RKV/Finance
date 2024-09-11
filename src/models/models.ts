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

export interface Reciept extends Document {
  ReceiptNo?: string;
  Amount?: number;
  Date?: string;
}
export interface Fee extends Document {
  ID?: string;
  BATCH?: string;
  Total?: number;
  installments?: Reciept[];
}

interface AcademicYear {
  Year: string;
  actualPay: number;
  SchReceived: number | null;
}

export interface IStudentSch extends Document {
  ID: string;
  BATCH: string;
  TotalSch: number;
  OtherSch: number;
  FeePaidbyTheStudent: number;
  TotalFeePaid: number;
  ActualPay: number;
  RemainingBalance: number;
  RefundAmount: number;
  academicYears: AcademicYear[];
}
export interface IloanDetails extends Document {
  year: { type: string; required: false };
  Loan: { type: string; required: false };
  Others: { type: string; required: false };
  Total: { type: string; required: false };
}
export interface ILoan extends Document {
  ID: string;
  grandTotal: number;
  refund: {
    RefundP1: { type: number; require: false };
    RefundP1_1: { type: number; require: false };
  };
  acYears: IloanDetails[];
}
