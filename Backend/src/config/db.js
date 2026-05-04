import "dotenv/config";
import mongoose from "mongoose"; 

/* ======= Connect to MongoDB =======  */
const connectDB = async () => {
  try {
    // Check if MONGO_URI is not found!
    if (!process.env.MONGO_URI) {
      console.log(
        `Critical Error: MONGO_URI is not defined in environment variables.`,
      );
      process.exit(1);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongodDB Connected Successfully at: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;