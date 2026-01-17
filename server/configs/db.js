import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );

    // DO NOT append /car-rental again
    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`)
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

export default connectDB;
