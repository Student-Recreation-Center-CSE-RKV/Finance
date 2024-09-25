import { Schema, model, Document } from "mongoose";
import { Fee } from "./models";

const tutionFeeSchema = new Schema<Fee>({
  ID: { type: String, required: true, unique: true },
  BATCH: { type: Number, require: true },
  Total: { type: Number, require: true },
  installments: [
    {
      ReceiptNo: { type: String, required: false },
      Date: { type: String, required: false },
      Amount: { type: String, required: false },
    },
  ],
  admissionFee: [
    {
      ReceiptNo: { type: String, required: false },
      Date: { type: String, required: false },
      Amount: { type: String, required: false },
    },
  ],
  reAdmissionFee: [
    {
      ReceiptNo: { type: String, required: false },
      Date: { type: String, required: false },
      Amount: { type: String, required: false },
    },
  ],
  cautionDeposit: [
    {
      ReceiptNo: { type: String, required: false },
      Date: { type: String, required: false },
      Amount: { type: String, required: false },
    },
  ],

});

const TutionFeeSchema = model("TutionFeeSchema", tutionFeeSchema);
export default TutionFeeSchema;
