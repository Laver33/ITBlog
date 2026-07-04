import { useEffect, useState } from "react";
import api from "../services/api";
import CardForStat from "../components/CardForStat";
import { useAuth } from "../context/AuthContext";

interface iUser {
    _id: string,
    name: string,
    lastName: string,
    email: string,
    role: 'user' | 'admin',
}

interface iPost {
    title: string,
    content: string,
    date: string,
}

const AdminPanel = () => {

    // Данные
    const [users, setUsers] = useState<iUser[]>([]);
    const [posts, setPosts] = useState<iPost[]>([]);
    const [error, setError] = useState(false);

    const { user } = useAuth();
     
    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await api.get('/users')
                setUsers(response.data);
            } catch (error) {
                console.error('Ошибка при получении пользователей:', error);
                setError(true);
            }};

            const fetchPosts = async () => {
            try {
                const response = await api.get('/posts')
                setPosts(response.data);
            } catch (error) {
                console.error('Ошибка при получении постов:', error);
                setError(true);
            }};
        

        fetchUsers();
        fetchPosts();
    }, [])

    if (error){ return <p>"Ошибка при загрузке данных"</p> }
    
    const currentUser = {
        name: user?.name,
        lastName: user?.lastName,
        email: user?.email,
        role: user?.role,
    }

    return (
        <div>

            <div className="flex gap-10">

                {/* Тут чисто краткая статистика */}
                <div className="w-5/12 ">
                    <h1 className="text-3xl text-white mb-5">Статистика сайта</h1>

                    <div className="content-stat flex-col gap-3 flex justify-between">
                        <CardForStat title={"Количество постов"} value={posts.length} />                
                        <CardForStat title={"Количество всего пользователей"} value={users.length} />                
                        <CardForStat title={"Количество админов"} value={users.filter(user => user.role === 'admin').length} />               
                        <CardForStat title={"Количество обычных пользователей"} value={users.filter(user => user.role === 'user').length} />               
                    </div>
                </div>

                {/* А тут наши данные */}
                <div className="w-7/12 ">
                    <h1 className="text-3xl text-white mb-5">Мои данные</h1>

                    <div className="grid gap-3 bg-gray-800 p-5 rounded">
                        <p className="px-4 py-3 rounded text-gray-400 border hover:bg-gray-600 hover:border-0 duration-300 bg-gray-700">Имя: {currentUser.name}</p>
                        <p className="px-4 py-3 rounded text-gray-400 border hover:bg-gray-600 hover:border-0 duration-300 bg-gray-700">Фамилия: {currentUser.lastName}</p>
                        <p className="px-4 py-3 rounded text-gray-400 border hover:bg-gray-600 hover:border-0 duration-300 bg-gray-700">Email: {currentUser.email}</p>
                        <p className="px-4 py-3 rounded text-gray-400 border hover:bg-gray-600 hover:border-0 duration-300 bg-gray-700">Роль: {currentUser.role}</p>
                    </div>

                </div>
            </div>

            <div className="flex mt-5 gap-10">

                <div className="w-1/2">
                    <h1 className="text-3xl text-white mb-5">Пользователи</h1>

                    <div className="bg-gray-800 p-5 flex flex-col gap-2 rounded overflow-y-auto 
                        max-h-64 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                    >
                        {/* Заголовок */}
                        <div className="flex gap-2 bg-gray-900 text-gray-400 py-1 px-2 rounded">
                            <p className="w-20 shrink-0">Имя</p>
                            <p className="w-28 shrink-0">Фамилия</p>
                            <p className="flex-1">Почта</p>
                            <p className="w-32 shrink-0">Роль</p>
                        </div>

                        {/* Пользователи */}
                        {users.map(user => (
                            <div 
                                key={user._id} 
                                className="flex items-center gap-2 text-white py-1 px-2 bg-gray-700 
                                    hover:bg-gray-600 duration-1000 rounded"
                            >
                                <p className="w-20 shrink-0 truncate">{user.name}</p>
                                <p className="w-28 shrink-0 truncate">{user.lastName}</p>
                                <p className="flex-1 truncate">{user.email}</p>

                                {user.role === 'admin' ? <p className="w-32 shrink-0 truncate">{user.role}</p> : 
                                    <button className="w-32 bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 duration-1000 whitespace-nowrap">
                                        Удалить
                                    </button>
                                }
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/2">
                    <h1 className="text-3xl text-white mb-5">Посты</h1>

                    <div className="bg-gray-800 p-5 rounded">
                        
                    </div>
                
                </div>

            </div>







            

        </div>
    )
}

export default AdminPanel;