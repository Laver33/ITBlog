
import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

import { validationResult } from "express-validator";


// Создание поста
export const createPost = async (req, res) => {

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                message: "Проблема с введенными данными.",
                errors: errors.array()
            })
        }

        const { title, content } = req.body;

        const author = await User.findById(req.user.userid);

        if (!author) {
            return res.status(404).json({ 
                message: "Автор не найден" 
            });
        }

        const newPost = new Post({
            title,
            content,
            author: author._id // id автора
        });

        await newPost.save();

        res.status(201).json(newPost)

    } catch (err) {
        res.status(500).json({
            message: "Произошла ошибка при создании поста.",
            error: err.message
        })
    }
};

export const getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find().populate('author', 'name email');
        
        if (posts.length === 0) {
            return res.status(404).json({
                message: "Постов не найдено."
            })
        }

        res.json(posts);

    } catch (err) {
        res.status(500).json({
            message: "Произошла ошибка при получении всех постов.",
            error: err.message
        })
    }
};

// Пост по названию
export const searchPost = async (req, res) => {

    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Необходимо указать заголовок поста."
            })
        }

        const posts = await Post.find({
            title: { 
                $regex: title, 
                $options: 'i' 
            }
        }).populate('author'); // приравниваем регистры

        if (posts.length === 0) {
            return res.status(404).json({
                message: "Пост не найден."
            })
        }

        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json({
            message: "Произошла ошибка при получении поста.",
            error: err.message
        })
    }
}


// Пост по айди 
export const getPostById = async (req, res) => {
    const { id } = req.params; 

    try {
        const post = await Post.findById(id).populate('author');

        if (!post) { 
            return res.status(404).json({ message: 'Пост не найден' });
        }

        res.status(200).json(post);

    } catch (err) {
        res.status(500).json({
            message: "Произошла ошибка при получении поста.",
            error: err.message
        });
    }
}

// Обновление по айди
export const updatePost = async ( req, res ) => {
    
     try { 

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        const { title, content } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true } // возвращает обновленный документ
        );

        res.status(200).json({ message: 'Пост успешно обновлен', result: updatedPost });


     } catch (err) {
        res.status(500).json({
            message: 'Произошла ошибка при обновлении поста.',
            error: err
        })
     }
}

// Удаление по айди
export const deletePostById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const post = Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Пост не найден' });
        }
        await post.deleteOne();

        res.status(200).json({
            message: 'Пост успешно удален'
        })

    } catch (err) {
        res.status(500).json({
            message: 'Произошла ошибка при удалении поста.',
            error: err
        })
    }
}

