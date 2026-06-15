import express, { json } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 5000;

mongoose.connect(process.env.MONGODB_CONNECT_PORT
).then(() =>{
    console.log('База подключена')}
).catch((err) => {
    console.log('Проблема с подключением к бд: ', err )})

app.use(express.json())


app.listen(port, () => {
    console.log('Server стартовал на: ' + `http://localhost:${port}`)
});

