import { body } from 'express-validator';

export const postCreateValidator = [
    body('title', 'Исправьте ваше название поста.').isLength({ min: 5, max: 50 }).isString(),
    body('content', 'Контент должен быть длинее 50 и короче 5000 символов.').isLength({ min: 50, max: 5000 }).isString(),
]