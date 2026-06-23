import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_PORT);
        console.log('База подключена');
    } catch (err) {
        console.error('Проблема с подключением к бд: ', err);
        process.exit(1);
    }
};