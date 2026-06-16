import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// Схемы
import User from "./models/userSchema.js";

// Валидация
import { registerValidator } from "./validations/authValidate.js";
import { validationResult } from "express-validator";


// База
dotenv.config();
const tokenSecret = process.env.JWT_SECRET_TOKEN;
const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_CONNECT_PORT
).then(() =>{
    console.log('База подключена')}
).catch((err) => {
    console.log('Проблема с подключением к бд: ', err )})

app.use(express.json())


app.listen(PORT, () => {
    console.log('Server стартовал на: ' + `http://localhost:${PORT}`)
});


// Тут будут роуты
app.get('/', (req, res) => {
    res.send('ff')
})

// Регистрация и вход
app.post('/auth/register', registerValidator, async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                message: "Проблема с введенными данными.",
                errors: errors.array()
            })
        }


        const { name, lastName, email, password } = req.body;

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            name,
            lastName,
            email,
            password: hashPassword
        });
        
        await newUser.save();

        res.status(200).json(newUser)

    } catch (err) {
        console.error('Ошибка регистрации:', err);
        res.status(500).json({
            message: 'Проблема с регистрацией',
            error: err.message,
        })
    }
})

app.post('/auth/login', async (req, res) => {
    try{
        const { email, password } = req.body;        
        const user = await User.findOne({ email });

        // Проверки
        if (!user) {
            return res.status(400).json({
                message: 'Пользователь не найден'
            })
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                message: 'Неверный пароль'
            })
        }


        const token = jwt.sign({userid: user.id} , tokenSecret, { expiresIn: '1h' })
        res.json({token}) // токен для теста

    } catch (err) {
        res.status(400).json({
            message: 'Проблема со входом',
            error: err.message
        })
    }
})



