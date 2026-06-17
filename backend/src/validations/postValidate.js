import { body } from 'express-validator';

export const postCreateValidator = [
    body('title', 'Исправьте ваше название поста.').isLength({ min: 5, max: 50 }).isString(),
    body('content', 'Контент должен быть длинее 5 символов.').isLength({ min: 5, max: 2000 }).isString(),
]