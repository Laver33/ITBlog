
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
        const posts = await Post.find();
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

export const searchPost = async (req, res) => {
    try{
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({
                message: "Необходимо указать заголовок поста."
            })
        }

        const posts = await Post.find({ $regex: title, $options: 'i' }) // для регистров
            .populate('author');

        if (posts.length === 0) {
            return res.status(404).json({
                message: "Пост не найден."
            })
        }

        res.status(200).json(Post);

    } catch (err) {
        res.status(500).json({
            message: "Произошла ошибка при получении поста.",
            error: err.message
        })
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author');

        if (post.length === 0) {
            return res.status(404).json({ message: 'Пост не найден' });
        }


    } catch (err) {
        res.status(500).json({
            message: "Произошла ошибка при получении поста.",
            error: err.message
        })
    }
}