import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Введите корректную почту.').isEmail(),
    body('password', 'Пароль должен быть длинее 5 символов.').isLength({ min: 6 }),
    body('name',  'Имя должно быть длинее 1 символа.').isLength({ min: 2 }),
    body('lastName', 'Фамилия должна быть длинее 3-х символов.').isLength({ min: 3})
]

export const loginValidator = [
    body('email', 'Введите корректную почту.').isEmail(),
    body('password', 'Пароль должен быть длинее 5 символов.').isLength({ min: 5 }),
]