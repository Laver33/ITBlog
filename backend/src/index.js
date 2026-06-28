import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


// Валидация
import { registerValidator, loginValidator } from "./validations/authValidate.js";
import { postCreateValidator } from "./validations/postValidate.js";

// Контроллеры
import * as authController from "./controllers/authController.js";
import * as postController from "./controllers/postController.js";
import * as userController from "./controllers/userController.js";

// MiddleWare
import { AuthCheck } from "./middleware/authMiddleware.js";
import { AdminCheck } from "./middleware/adminMiddleware.js";

// Коннект
import { connectDB } from './config/database.js';

// База
dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server стартовал на: http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Не удалось запустить сервер:', err);
    process.exit(1);
});

app.use(express.json())
app.use(cors())  // Для запросов с фронта


// Тут будут роуты
app.get('/', (req, res) => {
    res.send('test')
})

// Регистрация и вход
app.post('/auth/register', registerValidator, authController.register )
app.post('/auth/login',  loginValidator, authController.login )

//CRUD Юзеры 
app.get('/users', userController.getAllUsers )

// CRUD Посты ( все готовы )
app.post('/posts',AdminCheck, postCreateValidator, postController.createPost )
app.get('/posts', postController.getAllPosts )
app.get('/post/search',  postController.searchPost )
app.get('/posts/:id', postController.getPostById)  
app.put('/posts/:id', postController.updatePost )
app.delete('/posts/:id', postController.deletePostById )

// добавить после тестов проверки AdminCheck и AuthCheck

