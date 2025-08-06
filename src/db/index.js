import mongoose from "mongoose";
import { DB_NAME} from "../constants.js"

mongoose.set('debug', true)
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\nMongoDB Connected`);
        
    } catch (error) {
        console.log("Error in MongoDB Connection", error)
        process.exit(1)
    }
}


export default connectDB