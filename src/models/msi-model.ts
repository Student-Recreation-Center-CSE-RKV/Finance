import { Schema, model, Document } from "mongoose";
import { IMsi } from "./models";

const msiSchema = new Schema<IMsi>({
  CategoryName: { type: String, required: true },
  PaymentMode: { type: String, required: true },
  BankReferenceNo: { unique: true, type: String, required: true },
  TransactionDate: { type: Date, required: true },
  Amount: { type: Number, required: true },
  Status: { type: String, required: true },
  Date: { type: String, required: true },
  NameoftheStudent: { type: String, required: true },
  ClassAndYear: { type: String, required: true },
  IDNo: { type: String, required: true },
  OnAccountOf: { type: String, required: true },
  AmountPaidRs: { type: String, required: true },
  AmountInWords: { type: String, required: true },
  Remarks: { type: String, required: false },
  isVerified: { type: Boolean, default: false },
});

const Msi = model("MSI", msiSchema);
export default Msi;
