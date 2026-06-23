import jwt from 'jsonwebtoken';
import { AuthCheck } from './authMiddleware.js';

export const AdminCheck = (req, res, next) => {
    AuthCheck(req, res, () => {  
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Нет прав' });
        }
    });
};