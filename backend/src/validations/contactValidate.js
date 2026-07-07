import { body } from 'express-validator';

export const contactSendValidator = [
    body('name', 'Имя должно быть текстом').isString().notEmpty(),
    body('surname', 'Фамилия должна быть текстом').isString().notEmpty(),
    body('age', 'Возраст должен быть числом и при этом не больше 99 и не меньше 14').notEmpty().isInt({ min: 14, max: 99 }),
    body('email', 'Неверный email').isEmail(),
    body('telegram', 'Неверный телеграмм').isString().notEmpty(),
    body('title', 'Заголовок должен быть текстом').isString().notEmpty(),
    body('message', 'Сообщение должно быть текстом').isString().notEmpty(),
]