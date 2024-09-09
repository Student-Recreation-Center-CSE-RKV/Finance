import { Schema, model } from "mongoose";
import { ILoan } from "./models";

const loanSchema = new Schema<ILoan>({
  ID: { type: String, required: true, unique: true },
  grandTotal: { type: Number, require: true },
  refund: {
    RefundP1: { type: Number, require: false },
    RefundP1_1: { type: Number, require: false },
  },
  acYears: [
    {
      year: { type: String, required: false },
      Loan: { type: Number, required: false },
      Others: { type: Number, required: false },
      Total: { type: Number, required: false },
    },
  ],
});

const Loan = model("Loan", loanSchema);
export default Loan;
