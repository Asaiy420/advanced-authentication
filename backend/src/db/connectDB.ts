import mongoose from "mongoose"
import "dotenv/config"


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error:any) {
        console.log("Error when connecting to DB", error.message);
        process.exit(1) // in failure, 0 means success, 1 is failure
    }
}