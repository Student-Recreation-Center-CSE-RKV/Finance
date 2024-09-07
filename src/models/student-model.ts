import { Document, Schema, model } from "mongoose";
import { IStudent } from "./models";
const studentSchema = new Schema<IStudent>({
  ID: { type: String, required: true, unique: true },
  StudentName: { type: String, required: true },
  Gender: { type: String, required: true },
  Category: { type: String, required: false },
  // DOB: { type: Date, required: true },
  FatherName: { type: String, required: false },
  BATCH: { type: String, required: true },
});

const Student = model<IStudent>("Student", studentSchema);
export default Student;
