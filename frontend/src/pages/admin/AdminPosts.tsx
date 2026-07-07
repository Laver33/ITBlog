import { Link } from "react-router-dom";
import usePostStore from "../../store/postStore";

const AdminPosts = () => {

    const { posts, deletePost } = usePostStore()

    return(
        <div className="w-full">
            <h1 className="text-3xl text-white mb-5">Посты</h1>

            <div className="bg-gray-800 p-6 flex flex-col gap-2 rounded overflow-y-auto 
                max-h-125 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
                lg:max-h-150 xl:max-h-175"
            >
                {/* Заголовок */}
                <div className="flex gap-2 bg-gray-900 text-gray-400 py-4 px-2 rounded 
                    text-sm sm:text-base md:text-lg lg:text-xl"
                >
                    <p className="w-6/12 shrink-0 font-semibold">Название поста</p>
                    <p className="w-3/12 text-center font-semibold">Действие</p>
                    <p className="w-3/12 text-center font-semibold">Действие</p>
                </div>

                {/* Посты */}
                {posts.map(post => (
                    <div 
                        key={post._id} 
                        className="flex items-center gap-2 text-white py-3 px-2 bg-gray-700 
                            hover:bg-gray-600 duration-1000 rounded
                            text-sm sm:text-base md:text-lg"
                    >
                        <p className="w-6/12 shrink-0 truncate">{post.title}</p>

                        <Link
                            className="w-3/12 text-center bg-gray-500 px-2 py-1 rounded 
                                text-white hover:bg-gray-600 duration-1000 whitespace-nowrap
                                text-xs sm:text-sm md:text-base"
                            to={`/posts-change/${post._id}`}
                        >
                            Изменить
                        </Link>

                        <button 
                            className="w-3/12 bg-red-500 px-2 py-1 rounded text-white 
                                hover:bg-red-600 duration-1000 whitespace-nowrap
                                text-xs sm:text-sm md:text-base"
                            onClick={() => deletePost(post._id)}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPosts;