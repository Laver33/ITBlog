import User from "../models/userSchema.js";


export const getAllUsers = async (req, res) => {
    
    try {
        const users = await User.find();
        
        if (users.length === 0) {
            return res.status(404).json({
                message: "Пользователи не найдены."
            })
        }

        res.json(users);

    } catch (err) {
        
        res.status(500).json({
            message: "Произошла ошибка при получении всех пользователей.",
            error: err.message
        })

    }
}

export const deleteUserById = async (req, res) => {

    try {

        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

    } catch (err) {

        res.status(500).json({
            message: "Произошла ошибка при удалении пользователя.",
            error: err.message
        })

    }
}