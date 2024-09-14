import mongoose from "mongoose";
const connection = {};
export const connectMongoDB = async () => {
  try {
      if (connection.isConnected) {
          console.log("using existing connection");
          return;
      }
    const db = await mongoose.connect(process.env.MONGODB_URL);
    connection.isConnected = db.connections[0].readyState;
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to Mongodb: ", error);
  }
};
