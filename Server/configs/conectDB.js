
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected sucessfully ")
    } catch (error) {
        console.error("Db error : ", error)
    }
}