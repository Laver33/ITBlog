import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


// Валидация
import { registerValidator, loginValidator } from "./validations/authValidate.js";
import { postCreateValidator } from "./validations/postValidate.js";
import { contactSendValidator } from "./validations/contactValidate.js";

// Контроллеры
import * as authController from "./controllers/authController.js";
import * as postController from "./controllers/postController.js";
import * as userController from "./controllers/userController.js";
import * as contactController from "./controllers/contactController.js";

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
app.get('/auth/me', AuthCheck, authController.getMe);

//CRUD Юзеры ( доделать )
app.get('/users', userController.getAllUsers )
// app.put('/users/:id', userController.updateUser ) потом при личном кабинете
app.delete('/users/:id', userController.deleteUserById )    


// Контактная форма
app.post('/contact', AuthCheck, contactSendValidator, contactController.sendContactMessage);
app.get('/contacts', AdminCheck, contactController.getAllContactsMessage );
app.get('/contacts/:id', AdminCheck, contactController.getContactMessageById )
app.delete('/contacts/:id', AdminCheck, contactController.deleteContactMessage );
app.delete('/contacts', AdminCheck, contactController.deleteALLContactMessage );


// CRUD Посты ( все готовы )
app.post('/posts', AdminCheck, postCreateValidator, postController.createPost)
app.get('/posts', AuthCheck, postController.getAllPosts)
app.get('/post/search', AuthCheck, postController.searchPost)
app.get('/posts/:id', AuthCheck, postController.getPostById)  
app.put('/posts/:id', AuthCheck, postController.updatePost)
app.delete('/posts/:id', AdminCheck, postController.deletePostById)

// добавить после тестов проверки AdminCheck и AuthCheck

