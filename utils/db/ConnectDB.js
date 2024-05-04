import mongoose, { Mongoose } from "mongoose";

export async function Connect() {
  if (mongoose.connection.readyState) return;

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connect Successfully");
}
