import { useState } from "react";
import useCotactMessageStore from "../store/contactMessageStore";

interface iFormData {
    name: string;
    surname: string;
    age: number;
    email: string;
    telegram: string;
    title: string;
    message: string;
}


const ContactForm = () => {
    const [error, setError] = useState(false);
    const { sendContactMessage } = useCotactMessageStore();


    // Сохранение
    const [formData, setFormData] = useState<iFormData>({
        name: '',
        surname: '',
        age: 0,
        email: '',
        telegram: '',
        title: '',
        message: ''
    });


    // Обнова полей
    const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,  
            [name]: name === 'age' ? Number(value) : value 
        });
    };


    // Отправка
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (formData.age > 99 || formData.age < 14) {
            setError(true);
            return;
        }

        sendContactMessage(formData)



        // Очистка формы
        setFormData({
            name: '',
            surname: '',
            age: 0,
            email: '',
            telegram: '',
            title: '',
            message: ''
        });
    };


    if (error) return <p>Случилась проблема</p>

    return(
        <div className="w-full max-w-125">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 transition-all hover:shadow-gray-700/50">
                
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-linear-to-r from-blue-400 to-gray-600 bg-clip-text">
                    Contact Me
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Имя</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Имя"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Фамилия</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Фамилия"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Возраст</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Возраст"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ваш email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Telegram</label>
                        <input
                            type="text"
                            name="telegram"
                            value={formData.telegram}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="@username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Тема сообщения</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Тема"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Сообщение</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Ваше сообщение..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg
                         hover:from-blue-700 hover:to-blue-900 transition-all duration-1000 font-medium shadow-lg hover:shadow-blue-800"
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
}


export default ContactForm;