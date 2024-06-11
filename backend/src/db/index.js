import mongoose from "mongoose"
import { dbName } from "../constants.js";


const connectDb = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URL}/${dbName}`)

        console.log("Database connected ");
    } catch (error) {
        console.log("MongoDb connection failed ", error);
    }
}

export default connectDb