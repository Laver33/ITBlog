import { useAuth } from "../../context/AuthContext";

const AdminProfile = () => {

    const { user } = useAuth();

    const currentUser = {
        name: user?.name || "Не указано",
        lastName: user?.lastName || "Не указано",
        email: user?.email || "Не указано",
        role: user?.role || "Не указано",
    }

    // Заглушка для форм
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Функция обновления данных в разработке');
    }

    return(
        <div className="w-full">
            <h1 className="text-3xl text-white mb-5">Профиль ( в доработке )</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Мои данные */}
                <div className="bg-gray-800 p-6 rounded">
                    <h2 className="text-2xl text-white mb-4 flex items-center gap-2">
                        <span>👤</span> Мои данные
                    </h2>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-4 py-3 rounded bg-gray-700 hover:bg-gray-600 duration-300">
                            <span className="text-gray-400">Имя:</span>
                            <span className="text-white font-medium">{currentUser.name}</span>
                        </div>
                        <div className="flex justify-between items-center px-4 py-3 rounded bg-gray-700 hover:bg-gray-600 duration-300">
                            <span className="text-gray-400">Фамилия:</span>
                            <span className="text-white font-medium">{currentUser.lastName}</span>
                        </div>
                        <div className="flex justify-between items-center px-4 py-3 rounded bg-gray-700 hover:bg-gray-600 duration-300">
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white font-medium">{currentUser.email}</span>
                        </div>
                        <div className="flex justify-between items-center px-4 py-3 rounded bg-gray-700 hover:bg-gray-600 duration-300">
                            <span className="text-gray-400">Роль:</span>
                            <span className={`font-medium ${
                                currentUser.role === 'admin' ? 'text-green-400' : 'text-blue-400'
                            }`}>
                                {currentUser.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Смена данных */}
                <div className="bg-gray-800 p-6 rounded">
                    <h2 className="text-2xl text-white mb-4 flex items-center gap-2">
                        <span>✏️</span> Редактировать профиль
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Имя</label>
                            <input 
                                type="text" 
                                placeholder="Введите имя" 
                                defaultValue={currentUser.name !== "Не указано" ? currentUser.name : ''}
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 
                                    focus:border-blue-500 focus:outline-none duration-300
                                    placeholder:text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Фамилия</label>
                            <input 
                                type="text" 
                                placeholder="Введите фамилию" 
                                defaultValue={currentUser.lastName !== "Не указано" ? currentUser.lastName : ''}
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 
                                    focus:border-blue-500 focus:outline-none duration-300
                                    placeholder:text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Email</label>
                            <input 
                                type="email" 
                                placeholder="Введите email" 
                                defaultValue={currentUser.email !== "Не указано" ? currentUser.email : ''}
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 
                                    focus:border-blue-500 focus:outline-none duration-300
                                    placeholder:text-gray-500"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 
                                duration-300 font-medium"
                        >
                            Сохранить изменения
                        </button>
                    </form>
                </div>

                {/* Смена пароля */}
                <div className="bg-gray-800 p-6 rounded">
                    <h2 className="text-2xl text-white mb-4 flex items-center gap-2">
                        <span>🔒</span> Сменить пароль
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Текущий пароль</label>
                            <input 
                                type="password" 
                                placeholder="Введите текущий пароль"
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 
                                    focus:border-blue-500 focus:outline-none duration-300
                                    placeholder:text-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Новый пароль</label>
                            <input 
                                type="password" 
                                placeholder="Введите новый пароль"
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 
                                    focus:border-blue-500 focus:outline-none duration-300
                                    placeholder:text-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Подтверждение пароля</label>
                            <input 
                                type="password" 
                                placeholder="Подтвердите новый пароль"
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 
                                    focus:border-blue-500 focus:outline-none duration-300
                                    placeholder:text-gray-500"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 
                                duration-300 font-medium"
                        >
                            Сменить пароль
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile;