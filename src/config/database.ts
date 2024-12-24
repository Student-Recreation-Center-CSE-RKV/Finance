// import { connect } from "mongoose";
// const { MONGODB_URI } = require("./serverConfig");

// const connectDB = async () => {
//   try {
//     await connect(MONGODB_URI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//   }
// };

// export default connectDB;
import { connect } from 'mongoose';

const MONGODB_URI = "mongodb+srv://Revanth:Revanth1234@finance.x7snq.mongodb.net/?retryWrites=true&w=majority&appName=Finance";

const connectDB = async () => {
  try {
    const connection = await connect(MONGODB_URI);
    console.log("MongoDB connected");

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
