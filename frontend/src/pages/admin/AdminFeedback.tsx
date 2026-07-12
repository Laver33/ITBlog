import { Link } from "react-router-dom";
import useCotactMessageStore from "../../store/contactMessageStore";
import { toast } from "react-toastify";
import { ModalDeleteAll } from "../../components/Modal/Modal";
import { useState } from "react";

const AdminFeedback = () => {
    const { contactMessage, deleteContactMessage, deleteAllContactMessage, fetchContactsMessages } = useCotactMessageStore()
    const [modalActive, setModalActive] = useState<boolean>(false)

    // Обработка модалки
    const handleDeleteAll = async () => {
        try {
            await deleteAllContactMessage();
            toast.success('Все сообщения удалены');
        } catch (error) {
            toast.error('Ошибка при удалении');
        }
    };

    return(
        <div className="w-full">
            
            <div className="flex mb-5 gap-3">
                <h1 className="text-3xl text-white mr-5">Обратная связь</h1>
                <button
                    onClick={() => {
                        toast.success('Обновлен')
                        fetchContactsMessages()
                    }}
                    className="block text-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 
                                duration-300 font-medium text-sm transition-all"
                >
                    Обновить
                </button>

                <button
                    onClick={() => setModalActive(true)}
                    className="block text-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 
                                duration-300 font-medium text-sm transition-all"
                >
                    Очистить
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {contactMessage.map((message) => (
                    <div 
                        key={message._id}
                        className="bg-gray-800 rounded-lg p-5 duration-1000 transform 
                        hover:shadow-xl border border-gray-700 flex flex-col h-full hover:bg-gray-900"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-lg text-white">📧 Тема: </span>
                                <h3 className="text-white font-semibold text-lg truncate">
                                    {message.title || "Без темы"}
                                </h3>
                            </div>
                            <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">
                                # {message._id?.slice(-5) || '00000'}
                            </span>
                        </div>

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

                        <div className="mt-4 pt-3 gap-3 flex border-gray-600">
                            <Link
                                to={`/contacts/${message._id}`}
                                className="w-6/12 block text-center bg-blue-600 text-white px-4 py-2 rounded 
                                    hover:bg-blue-700 duration-300 font-medium text-sm transition-all"
                            >
                                Ознакомится
                            </Link>

                            <button
                                className="w-6/12 block text-center bg-red-600 text-white px-4 py-2 rounded 
                                    hover:bg-red-700 duration-300 font-medium text-sm transition-all"
                                onClick={() => {
                                    if (window.confirm('Удалить это сообщение?')) {
                                        deleteContactMessage(message._id);
                                    }
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Модалка */}
            <ModalDeleteAll 
                active={modalActive} 
                setActive={setModalActive}
                onConfirm={handleDeleteAll}
            />
        </div>
    )
}

export default AdminFeedback;