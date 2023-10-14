import mongoose from "mongoose"

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURI)
        console.log("Connected to MongoDB.")
        console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB