import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

// Схемы
import User from "../models/userSchema.js";

dotenv.config();
const tokenSecret = process.env.JWT_SECRET_TOKEN;


// Регистрация
export const register = async (req, res) => {
    
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
}

// Вход
export const login = async (req, res) => {
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


        const token = jwt.sign(
            {
                userid: user.id,
                role: user.role
            },
            tokenSecret, 
            { expiresIn: '30d' },
        )

        res.json({token}) // токен для теста

    } catch (err) {
        res.status(400).json({
            message: 'Проблема со входом',
            error: err.message
        })
    }
}

export const getMe = async (req, res) => {
    try {

        const user = await User.findById(req.user.userid).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка получения данных' });
    }
};