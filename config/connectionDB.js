import mongoose from "mongoose";

let connected = false

const connectDB = async() => {
    mongoose.set('strictQuery', true)
    if(connected){
        console.info('MongoDB is already connected...')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.info('MongoDB connected...')
    } catch (error) {
        console.error(error)
    }
}

export default connectDB