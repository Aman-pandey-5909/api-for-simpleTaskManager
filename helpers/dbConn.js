
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        connection.on("error", (err) => {
            console.log("MongoDB connection error", err);
            process.exit(1);
        });
        connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    } catch (error) {
        console.error("Something went wrong in DB connection: ", error);
    }
};

export default connectDB;