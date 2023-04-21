import mongoose from 'mongoose';
const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
    });
    console.log(connection.connection.host);
};
export default connectDB;