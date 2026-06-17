import jwt from 'jsonwebtoken';

export const AdminCheck =  (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Нету заголовка авторизации",
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

        // Проверка самой роли
        if (req.user && req.user.role === "admin") {
            
            next();

        } else {
            return res.status(403).json({
                message: "У вас нет прав доступа",
            });
        }

    } catch (err) {
        res.status(401).json({
            message: "Неверный токен авторизации",
        });
    }
};
