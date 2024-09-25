import { Schema, model, Document } from "mongoose";
import { HostelFee } from "./models";

const hostelFeeSchema = new Schema<HostelFee>({
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

const HostelFeeSchema = model("HostelFeeSchema", hostelFeeSchema);
export default HostelFeeSchema;
