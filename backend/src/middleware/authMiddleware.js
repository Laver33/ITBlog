import jwt from 'jsonwebtoken';

export const AuthCheck = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Нету залоговка авторизации",
            });
        }
        const token = authHeader.split(' ')[1]; // Сам токен достаем
        if (!token) {
            return res.status(401).json({ 
                message: 'Неверный формат токена' 
            });
        }

        // Проверка самого токена
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = decodedJWT;

        next();

    } catch (err) {
        res.status(401).json({
            message: "Неверный токен авторизации",
        });
    }
};
