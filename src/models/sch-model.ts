import { Schema, model } from "mongoose";
import { IStudentSch } from "./models";
const studentSchema = new Schema<IStudentSch>({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  BATCH: {
    type: String,
    required: true,
  },
  TotalSch: {
    type: Number,
    required: true,
  },
  OtherSch: {
    type: Number,
    required: true,
  },
  FeePaidbyTheStudent: {
    type: Number,
    required: true,
  },
  TotalFeePaid: {
    type: Number,
    required: true,
  },
  ActualPay: {
    type: Number,
    required: true,
  },
  RemainingBalance: {
    type: Number,
    required: true,
  },
  RefundAmount: {
    type: Number,
    default: 0,
  },
  academicYears: [
    {
      Year: {
        type: String,
        required: true,
      },
      ActualPay: {
        type: Number,
        required: true,
      },
      SchReceived: {
        type: Number,
        default: null, // null for years with no scholarship received
      },
    },
  ],
});

const StudentSch = model("StudentSch", studentSchema);

export default StudentSch;
