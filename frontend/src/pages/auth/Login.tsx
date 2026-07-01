import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {

    // для данных
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{email?: string, password?: string}>({});
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess('');
        
        const newErrors: {email?: string, password?: string} = {};
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            newErrors.email = 'Введите корректную почту.';
        }
        
        if (!password || password.length < 5) {
            newErrors.password = 'Пароль должен быть длинее 5 символов.';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setErrors({});
        console.log('Login:', { email, password });
        setSuccess('Вход выполнен');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="flex justify-center items-center min-h-screen">

            <div className="bg-gray-900 p-7 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md transition-all hover:shadow-gray-700/50">

                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-linear-to-r from-blue-400 to-gray-600 bg-clip-text">
                    Вход
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors({...errors, email: ''});
                            }}
                            className={`w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-lg border ${
                                errors.email ? 'border-red-500' : 'border-gray-600'
                            } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>


                    <div>
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({...errors, password: ''});
                            }}
                            className={`w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-lg border ${
                                errors.password ? 'border-red-500' : 'border-gray-600'
                            } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                    </div>
                </form> 


                {/* Правила для входа - теперь вне формы */}
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 my-6">
                    <p className="text-gray-400 text-center mb-2 text-sm font-semibold">📋 Краткие правила</p>
                    <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                        <li>Почта должна быть корректной</li>
                        <li>Пароль должен быть длинее 7 символов.</li>
                    </ul>
                </div>


                {success && (
                    <div className="bg-green-900/50 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-center mb-4">
                        {success}
                    </div>
                )}


                {/* Кнопки вне формы */}
                <div className="space-y-3">
                    <div className="flex gap-3">

                        <button
                            type="submit"
                            onClick={handleSubmit} // 👈 Добавляем обработчик на кнопку
                            className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                            text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                        >
                            Войти
                        </button>

                        <Link
                            className="w-full border border-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-center
                            text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                            to={'/register'}
                        >
                            Регистрация
                        </Link>

                    </div>


                    <Link
                        className="w-full block border border-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-center
                        text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                        to={'/'}
                    >
                        Вернуться на главную
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default LoginPage;