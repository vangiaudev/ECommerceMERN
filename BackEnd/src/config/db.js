import mongoose from 'mongoose';
//import dotenv from 'dotenv';
//import colors from 'colors';


//dotenv.config()
//options not necessary for mongoose 6
const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI, /* {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    } */)

    console.log(`MongoDB Connected:`);

  } catch (error) {
    console.error(`Co Loi: ${error}`);
    process.exit(1);
  }
}

export default connectDB;
