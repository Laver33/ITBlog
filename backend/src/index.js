import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';


// Валидация
import { registerValidator, loginValidator } from "./validations/authValidate.js";
import { postCreateValidator } from "./validations/postValidate.js";

// Контроллеры
import * as authController from "./controllers/authController.js";
import * as postController from "./controllers/postController.js";

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


// Тут будут роуты
app.get('/', (req, res) => {
    res.send('test')
})

// Регистрация и вход
app.post('/auth/register', registerValidator, authController.register )
app.post('/auth/login',  loginValidator, authController.login )

// CRUD Посты ( все готовы )
app.post('/posts',AdminCheck, postCreateValidator, postController.createPost )
app.get('/posts', AuthCheck, postController.getAllPosts )
app.get('/post/search', AuthCheck, postController.searchPost )
app.get('/posts/:id', AuthCheck, postController.getPostById)  
app.put('/posts/:id', AdminCheck, postController.updatePost )
app.delete('/posts/:id', AdminCheck, postController.deletePostById )



