import mongoose from "mongoose";

export const connectDB = async (uri) => {
  await mongoose.connect(uri, { dbName: "cua_hang_sach" });
  console.log("✅ MongoDB connected");
};
