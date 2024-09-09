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
});

const TutionFee = model("TutionFeeSchema", tutionFeeSchema);
export default TutionFee;
