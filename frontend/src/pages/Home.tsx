import { useEffect, useState, useMemo } from 'react';
import * as IconName from "react-icons/cg";
import HomeUsers from '../components/HomeUsers';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeAdmin from '../components/HomeAdmin';
import usePostStore from '../store/postStore';
import useUserStore from '../store/userStore';
import useCotactMessageStore from '../store/contactMessageStore';


const Home = () => {

  const { user } = useAuth();
  // const {error, setError} = useState<boolean | null>(false);
  
  // Сторы
  const { posts, loading, fetchPosts } = usePostStore();
  const { fetchUsers } = useUserStore();
  const { fetchContactsMessages } = useCotactMessageStore();

  // Сортировка по дате
  const [isDescending, setIsDescending] = useState(true); 
  const toggleSort = () => {
    setIsDescending(!isDescending);
  };


  const sortedPosts = useMemo(() => {
    const postsCopy = [...posts];
    
    return postsCopy.sort((a, b) => {
      if (isDescending) {
        return b.date.localeCompare(a.date);
      } else {
        return a.date.localeCompare(b.date);
      }
    });
  }, [posts, isDescending]); 



  useEffect(() => {

    fetchContactsMessages();
    fetchUsers();
    fetchPosts();

  }, []);

  if (loading) return <div>Загрузка...</div>;
  // if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className='flex mt-6 gap-3'>


      {/* Левая колонка */}
      <div className='w-9/12'>
        <div className='bg-gray-900 mx-6 p-6 mb-4 rounded-sm shadow-lg border border-gray-700 h-auto cursor-default'>
          <h1 className='text-2xl font-bold mb-4 text-white'>
            Добро пожаловать, тут все посты с нашего сайта.
          </h1>
          <p className='text-gray-300 leading-relaxed'>
            При получении улучшеной роли, вы сможите получать больше информации и писать посты.
          </p>

          <hr className='border-white my-4'/>


          {/* Кнопка сортировки */}
          <button 
            className={`flex items-center gap-2 text-gray-200 px-4 py-2 rounded-lg 
              transition-colors duration-200 border border-gray-600 
              ${isDescending ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-600 hover:bg-gray-700'}`}
            onClick={toggleSort}
          >
            <span>
              {isDescending ? 'Новые' : 'Старые'}
            </span>
            <IconName.CgMenuLeft className={`w-5 h-5 transition-transform duration-200 ${isDescending ? '' : 'rotate-180'}`} />
          </button>
        </div>


        {/* Посты */}
        {sortedPosts.map((post) => (
          <div 
            key={post._id}
            className='bg-gray-900 mx-6 p-6 mb-4 rounded-sm shadow-lg border border-gray-700 cursor-default'
          >
            <h1 className='text-2xl font-bold mb-4 text-blue-400'>
              {post.title}
            </h1>
            <p className='text-gray-300 leading-relaxed'>
              {post.content.slice(0, 200)}
            </p>

            {/* Нижняя часть поста */}
            <div className="botton-content flex mt-6 justify-between">
              <Link
                to={`/posts/${post._id}`}
                className='cursor-pointer px-5 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-sm border border-gray-600 
                  hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300'
              >
                Читать дальше
              </Link>

              <p className='text-gray-300'>
                {post.date.slice(0, 10)} 
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='w-3/12'>
          <div className='sticky top-6 transition-all'>
              <HomeUsers />
              
              {user?.role === 'admin' ? <HomeAdmin /> : null}
          </div>
      </div>

    </div>
  );
};


export default Home;