import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://connectasifpk:12345@cluster0.itg4p.mongodb.net/data"
    );
    console.log(`MongoDB connected:${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDb;
