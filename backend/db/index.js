import mongoose from 'mongoose';

const connectDB = async() => {
    try{
      const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
      console.log(`MongoDB connected successfully to ${connectionInstance.connection.host}`);
    }
    catch(err){
        console.log('DB connection error:',err);
        process.exit(1);
    }
}

export default connectDB;