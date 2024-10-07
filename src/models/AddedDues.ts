import mongoose, { Document, Schema } from 'mongoose';

// Define the interface representing a document in MongoDB
export interface IAddedDues extends Document {
  addedOn: Date;
  dueNumber: string;
  amount: number;
  feeType: string;
  uploadFile: string;
  addedToID: string; // This is the ID to which the dues are added
}

// Create the schema corresponding to the document interface
const AddedDuesSchema: Schema = new Schema({
  addedOn: {
    type: Date,
    required: true,
    default: Date.now, // Auto-generate the date
  },
  dueNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  feeType: {
    type: String,
    required: true,
  },
 
  addedToID: {
    type: String, // This should be the ID of the student or entity it's added to
    required: true,
  },
  image: {
    type: String, // You can store the file path or filename here
    required: false, // Make it optional if not always required
  },
});

// Create the model from the schema and export it
const AddedDues = mongoose.model<IAddedDues>('AddedDues', AddedDuesSchema);
export default AddedDues;
