import { useEffect, useState } from 'react';
import api from '../services/api';

interface iPost {
  _id: number;
  title: string;
  content: string;
}

interface iUser {
  _id: number;
  name: string;
  lastName: string;
  email: string;
}



const Home = () => {

  // Для данных
  const [posts, setPosts] = useState<iPost[]>([]);
  const [users, setUsers] = useState<iUser[]>([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {

      const ferchUsers = async () => {
        try {

            const response = await api.get('/users');
            setUsers(response.data);

        } catch (err: any) {
          setError(err?.message || String(err) || 'Ошибка с юзерами');

        } finally {
            setLoading(false);
        }
      }


        // Посты с бека
        const fetchPosts = async () => {
            try {

                const response = await api.get('/posts');
                setPosts(response.data);

            } catch (err: any) {
                setError(err?.message || String(err) || 'Ошибка с постами');

            } finally {
                setLoading(false);
            }
        };

        ferchUsers();
        fetchPosts();
    }, []); // пустой массив = выполнить 1 раз при загрузке
  

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;


  return(
    <div className='flex mt-6 gap-3'>

      {/* Левая колонка */}
      <div className='w-9/12'>
        
        {/* Описание главной */}
        <div className='bg-gray-900 mx-6 p-6 mb-4 rounded-sm shadow-lg border border-gray-700 h-37.5 cursor-default'>
          <h1 className='text-2xl font-bold mb-4 text-white'>
            Добро пожаловать, тут все посты с нашего сайта.
          </h1>
          <p className='text-gray-300 leading-relaxed'>
            При получении улучшеной роли, вы сможите получать больше информации и писать посты.
          </p>
        </div>

        {/* Посты */}
        {posts.map((post) => (
          <div 
            key={post._id}
            className='bg-gray-900 mx-6 p-6 mb-4 rounded-sm shadow-lg border border-gray-700 cursor-default'
          >

            <h1 className='text-2xl font-bold mb-4 text-blue-400'>
              {post.title}
            </h1>

            <p className='text-gray-300 leading-relaxed'>
              {post.content}
            </p>

            <button
              onClick={undefined}
              className='cursor-pointer mt-6 px-5 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-sm border border-gray-600 hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'
            >
              Читать дальше
            </button>

          </div>
        ))}
      </div>

      {/* Пользователи (справа, фиксированные) */}
      <div className='w-3/12 bg-gray-900 rounded-sm shadow-lg border border-gray-700 px-2 pt-4 h-100 
          overflow-y-auto sticky top-6 transition-all hover:shadow-blue-500/5 cursor-default'
        >
        <h2 className='mb-4 text-xl font-bold text-gray-300 bg-clip-text text-center'>
          Пользователи
        </h2>
        <ul>
          {users.map((user) => (
            <li 
              key={user._id} 
              className='bg-gray-800/50 hover:bg-gray-800 p-2 rounded-sm border border-gray-700 transition-all duration-1000 hover:border-blue-500/50 hover:translate-x-1'
            >
              <p className='text-sm text-gray-300'>
                <span className='font-semibold text-blue-400'>
                  {user.name} {user.lastName}
                </span> • {user.email}
              </p>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  )
}

export default Home;