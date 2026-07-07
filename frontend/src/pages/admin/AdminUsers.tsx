import { useEffect } from "react";
import useUserStore from "../../store/userStore";
import usePostStore from "../../store/postStore";
import useCotactMessageStore from "../../store/contactMessageStore";

const AdminUsers = () => {

      // Сторы
    const { fetchPosts } = usePostStore();
    const { fetchUsers } = useUserStore();
    const { fetchContactsMessages } = useCotactMessageStore();

    useEffect(() => {
    
        fetchContactsMessages();
        fetchUsers();
        fetchPosts();
    
      }, []);

    const { users, deleteUser } = useUserStore()

    return(
        <div className="w-full">
            <h1 className="text-3xl text-white mb-5">Пользователи</h1>
            
            <div className="bg-gray-800 p-6 flex flex-col gap-2 rounded overflow-y-auto 
                max-h-125 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
                lg:max-h-150 xl:max-h-175"
            >
                {/* Заголовок */}
                <div className="flex gap-2 bg-gray-900 text-gray-400 py-4 px-2 rounded
                    text-sm sm:text-base md:text-lg lg:text-xl"
                >
                    <p className="w-[15%] shrink-0 font-semibold">Имя</p>
                    <p className="w-[15%] shrink-0 font-semibold">Фамилия</p>
                    <p className="flex-1 font-semibold">Почта</p>
                    <p className="w-[15%] shrink-0 text-center font-semibold">Роль</p>
                </div>

                {/* Пользователи */}
                {users.map(user => (
                    <div 
                        key={user._id} 
                        className="flex items-center gap-2 text-white py-3 px-2 bg-gray-700 
                            hover:bg-gray-600 duration-1000 rounded
                            text-sm sm:text-base md:text-lg"
                    >
                        <p className="w-[15%] shrink-0 truncate">{user.name}</p>
                        <p className="w-[15%] shrink-0 truncate">{user.lastName}</p>
                        <p className="flex-1 truncate">{user.email}</p>

                        {user.role === 'admin' ? 
                            <p className="w-[15%] shrink-0 text-center text-green-400 font-semibold">
                                {user.role}
                            </p> : 
                            <button 
                                className="w-[15%] bg-red-500 px-2 py-1 rounded text-white 
                                    hover:bg-red-600 duration-1000 whitespace-nowrap
                                    text-xs sm:text-sm md:text-base"
                                onClick={() => deleteUser(user._id)}
                            >
                                Удалить
                            </button>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminUsers;