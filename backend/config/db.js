import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/thinkboard");
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("Database connection failed ❌");
    process.exit(1);
  }
};

export default connectDB;

