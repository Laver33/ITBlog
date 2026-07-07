import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

interface iPost {
  _id: number;
  title: string;
  content: string;
  date: string;
}


const PostPage = () => {
    const { id } = useParams()

    const [post, setPost] = useState<iPost>();
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchPost =  async () => {
            
            const respose = await api.get(`/posts/${id}`)
            setPost(respose.data)

            if (respose.status === 404) {
                setError('Пост не найден')
            }

        }


        fetchPost();
    }, [])

    if (error) {
        return <div>{error}</div>
    }


    return (
        
        <div className="flex gap-10 justify-center ">


            {/* Пост */}
            <div className="bg-gray-800 w-full max-w-2xl p-6 rounded-lg shadow-xl">
                <h1 className="text-2xl text-white font-bold mb-4">{post?.title}</h1>

                <div className="px-4 py-2 bg-gray-700/50 rounded-lg mb-4">
                    <p className="text-gray-300 leading-relaxed">{post?.content}</p>
                </div>
                
                <p className="text-sm text-gray-400 mb-6">
                    Дата публикации: {post?.date.slice(0, 10)}
                </p>

                <div className="flex justify-start">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gray-700 
                            rounded-lg border border-gray-600 
                            hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 
                            transition-all duration-300"
                    >
                        ← Вернуться
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default PostPage;    