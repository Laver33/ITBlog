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

// База
dotenv.config();
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
    res.send('test')
})

// Регистрация и вход
app.post('/auth/register', registerValidator, authController.register )
app.post('/auth/login',  loginValidator, authController.login )

// CRUD Посты
app.post('/posts', AuthCheck,  AdminCheck, postCreateValidator, postController.createPost )
app.get('/posts', AuthCheck, postController.getAllPosts )
app.get('/post/search', postController.searchPost )
app.get('/posts/:id', postController.getPostById)  
// app.put('/posts/:id', updatePost )
// app.delete('/posts/:id', deletePost )



