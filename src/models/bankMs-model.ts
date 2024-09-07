import { Schema, model, Document } from "mongoose";
import { IBankMs } from "./models";

const BankMsSchema = new Schema<IBankMs>({
  DueNo: { type: String, required: true },
  Credit: { type: Number, require: true },
  Debit: { type: Number, require: true },
});

const BankMs = model("BankMs", BankMsSchema);
export default BankMs;
