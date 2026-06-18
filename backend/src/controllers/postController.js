
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