import { Schema, model, Document } from "mongoose";

// Define an interface for the installments array
interface Installment {
  ReceiptNo?: string;
  Date?: string;
  Amount?: string;
}

// Define an interface for the main document
interface OtherFromMSIDocument extends Document {
  ID: string;
  Total: number;
  installments: Installment[];
}

// Define the schema for "OtherFromMSI"
const OtherFromMSISchema = new Schema<OtherFromMSIDocument>({
  ID: { type: String, required: true, unique: true },
  Total: { type: Number, required: true },
  installments: [
    {
      ReceiptNo: { type: String, required: false },
      Date: { type: String, required: false },
      Amount: { type: String, required: false },
      category:{type:String,required:false}
    },
  ],
});

// Create the model with the typed document interface
const OtherFromMSI = model<OtherFromMSIDocument>("OtherFromMSI", OtherFromMSISchema);

export default OtherFromMSI;
