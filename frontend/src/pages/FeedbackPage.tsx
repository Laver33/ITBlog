import { useParams } from "react-router-dom";
import useCotactMessageStore from "../store/contactMessageStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const FeedbackPage = () => {

    const { id } = useParams();
    const [ error, setError ] = useState(false)
    const { currentMessage, loading, ContactMessageById, deleteContactMessage } = useCotactMessageStore();

    useEffect(() => {

        id ? ContactMessageById(id) : setError(true);
        
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (!currentMessage) return <p>Сообщение не найдено</p>;
    if (error) return <p> У нас проблема </p>




return (
    <div className="flex gap-10 justify-center min-h-80vh items-center">
        
        {/* Карточка фидбека */}
        <div className="bg-gray-800 w-full max-w-2xl p-6 rounded-lg shadow-xl">
            
            {/* Заголовок */}
            <h1 className="text-2xl text-white font-bold mb-4">
                Сообщение от {currentMessage.name}
            </h1>

            {/* Информация о пользователе */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase">Имя</p>
                    <p className="text-white font-medium">{currentMessage.name}</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase">Фамилия</p>
                    <p className="text-white font-medium">{currentMessage.surname}</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase">Возраст</p>
                    <p className="text-white font-medium">{currentMessage.age} лет</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase">Telegram</p>
                    <p className="text-white font-medium">{currentMessage.telegram}</p>
                </div>
            </div>

            {/* Email */}
            <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-400 uppercase">Email</p>
                <p className="text-white font-medium">{currentMessage.email}</p>
            </div>

            {/* Тема */}
            <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-400 uppercase">Тема</p>
                <p className="text-white font-medium">{currentMessage.title}</p>
            </div>

            {/* Сообщение */}
            <div className="px-4 py-3 bg-gray-700/50 rounded-lg mb-6">
                <p className="text-xs text-gray-400 uppercase mb-1">Сообщение</p>
                <p className="text-gray-300 leading-relaxed">{currentMessage.message}</p>
            </div>
            
            {/* Кнопки */}
            <div className="flex justify-between gap-4">
                <Link 
                    to="/adminpanel/feedback" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium 
                        text-white bg-gray-700 rounded-lg border border-gray-600
                        hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 
                        transition-all duration-300 flex-1"
                >
                    ← Вернуться
                </Link>

                <Link
                    onClick={() => {
                        deleteContactMessage(currentMessage._id);
                    }}
                    to={'/adminpanel/feedback'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium 
                        text-white bg-red-600/80 rounded-lg border border-red-500
                        hover:bg-red-600 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/25 
                        transition-all duration-300 flex-1"
                >
                    🗑 Удалить
                </Link>
            </div>
        </div>
        
    </div>
    );
}


export default FeedbackPage;