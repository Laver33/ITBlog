import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const RegisterPage = () => {

    // для данных
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{name?: string, lastName?: string, email?: string, password?: string, confirmPassword?: string}>({});
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess('');
        
        const newErrors: {name?: string, lastName?: string, email?: string, password?: string, confirmPassword?: string} = {};
        
        if (!name || name.length < 2) {
            newErrors.name = 'Имя должно быть длинее 1 символа.';
        }
        
        if (!lastName || lastName.length < 3) {
            newErrors.lastName = 'Фамилия должна быть длинее 3-х символов.';
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            newErrors.email = 'Введите корректную почту.';
        }
        
        if (!password || password.length < 8) {
            newErrors.password = 'Пароль должен быть длинее 7 символов.';
        }
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают.';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setErrors({});
        console.log('Register:', { name, lastName, email, password });

        api.post('/auth/register', { name, lastName, email, password })
           .then(res => { console.log(
               res.data
           )}).catch(errors => {
            console.error('Ошибка при отправке:', errors);
        })
            


        setSuccess('Регистрация прошла успешно!');
        setName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="flex justify-center items-center min-h-auto">

            <div className="bg-gray-900 p-7 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md transition-all hover:shadow-gray-700/50">

                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-linear-to-r from-blue-400 to-gray-600 bg-clip-text">
                    Регистрация
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors({...errors, name: ''});
                            }}
                            className={`w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-lg border ${
                                errors.name ? 'border-red-500' : 'border-gray-600'
                            } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Ваша фамилия"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                if (errors.lastName) setErrors({...errors, lastName: ''});
                            }}
                            className={`w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-lg border ${
                                errors.lastName ? 'border-red-500' : 'border-gray-600'
                            } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
                        />
                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                    </div>

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

                    <div>
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                            }}
                            className={`w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-lg border ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                            } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
                        />
                        {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>


                    {/* Правила для регистрации */}
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 my-7">
                        <p className="text-gray-400 text-center mb-2 text-sm font-semibold">📋 Краткие правила</p>
                        <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                            <li>Имя должно быть длинее 1 символа.</li>
                            <li>Фамилия должна быть длинее 3-х символов.</li>
                            <li>Почта должна быть корректной</li>
                            <li>Пароль должен быть длинее 7 символов.</li>
                        </ul>
                    </div>

                    {success && (
                        <div className="bg-green-900/50 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-center">
                            {success}
                        </div>
                    )}

                    {/* Кнопки вне формы */}
                    <div className="space-y-3">
                        <div className="flex gap-3">

                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                                text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                            >
                                Зарегистрироваться
                            </button>

                            <Link
                                className="w-full border border-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-center
                                text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                                to={'/login'}
                            >
                                Войти
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

                </form>
            </div>
        </div>
    );
};

export default RegisterPage;