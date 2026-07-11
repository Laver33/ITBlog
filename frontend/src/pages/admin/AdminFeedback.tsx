import { Link } from "react-router-dom";
import useCotactMessageStore from "../../store/contactMessageStore";

const AdminFeedback = () => {
    const { contactMessage, deleteContactMessage } = useCotactMessageStore()

    return(
        <div className="w-full">
            <h1 className="text-3xl text-white mb-5">Обратная связь</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {contactMessage.map((message) => (
                    <div 
                        key={message._id}
                        className="bg-gray-800 rounded-lg p-5 duration-1000 transform 
                        hover:shadow-xl border border-gray-700 flex flex-col h-full hover:bg-gray-900"
                    >
                        {/* Заголовок с иконкой */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-lg text-white">📧 Тема: </span>
                                <h3 className="text-white font-semibold text-lg truncate">
                                    {message.title || "Без темы"}
                                </h3>
                            </div>
                            <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">
                                # {message._id?.slice(-6) || '000000'}
                            </span>
                        </div>

                        {/* Информация об отправителе */}
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-sm">👤</span>
                                <span className="text-sm truncate">
                                    {message.name} {message.surname}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-sm">✉️</span>
                                <span className="text-sm truncate">
                                    {message.email}
                                </span>
                            </div>
                        </div>

                        {/* Кнопка */}
                        <div className="mt-4 pt-3 gap-3 flex border-gray-600">
                            <Link
                                to={`/contacts/${message._id}`}
                                className="w-6/12 block text-center bg-blue-600 text-white px-4 py-2 rounded 
                                    hover:bg-blue-700 duration-300 font-medium text-sm
                                    transition-all"
                            >
                                Ознакомится
                            </Link>

                            <button
                                className="w-6/12 block text-center bg-red-600 text-white px-4 py-2 rounded 
                                    hover:bg-red-700 duration-300 font-medium text-sm
                                    transition-all"
                                    onClick={() => {
                                        deleteContactMessage(message._id)
                                    }}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminFeedback;