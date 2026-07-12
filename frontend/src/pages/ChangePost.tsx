import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import usePostStore from "../store/postStore";

interface iPost {
    _id?: string;
    title: string;
    content: string;
}

interface iErrors {
    title?: string,
    content?: string,
}

const ChangePost = () => {

    const { id } = useParams()
    const { currentPost, fetchPost, updatePost, loading } = usePostStore()
    const [post, setPost] = useState<iPost>({
        title: '',
        content: ''
    });
    const [errors, setError] = useState<iErrors>({});
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            toast.error('ID не найден');
            navigate('/');
            return; 
        }

        fetchPost(id);
    }, [id, fetchPost, navigate])

    // Заполняем форму
    useEffect(() => {
        if (currentPost) {
            setPost({
                title: currentPost.title,
                content: currentPost.content
            });
        }
    }, [currentPost])

    // Обработка формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (post.title.trim() === '') {
            setError({
                title: 'Название поста не может быть пустым'
            })
            return
        }

        if (post.content.trim() === '') {
            setError({
                content: 'Контент поста не может быть пустым'
            })
            return
        } 

        try {

            await updatePost(post as any, id as string);
            
            toast.success('Пост обновлен');
            setError({});
            navigate('/');

        } catch (error) {
            setError({
                title: 'Ошибка обновления поста'
            });
            console.log(error);
        }
    }

    // Изменения в данных
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setPost((prevData) => ({
            ...prevData,     
            [name]: value  
        }));
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full min-h-[80vh]">
                <p className="text-white text-xl">Загрузка...</p>
            </div>
        )
    }

    return(
        <div className="flex justify-center items-center w-full min-h-[80vh]">

            <div className="w-full max-w-125 p-4 rounded-sm border border-gray-700 bg-gray-800 ">

                <h1 className="text-4xl font-bold text-center mb-6 gradient-text text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-gray-600">
                    Редактирование поста
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Название поста</label>
                        <input
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 max-h-12 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.title ? 'border-red-500' : 'border-gray-600'}`}
                            placeholder="Название"
                            disabled={loading}
                        />
                        
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Контент</label>
                        <textarea
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                            rows={8}
                            maxLength={5000}
                            className={`w-full px-4 py-2 max-h-62.5 bg-gray-700/50 border rounded-lg justify-start 
                            text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.content ? 'border-red-500' : 'border-gray-600'}`}
                            placeholder="Контент"
                            disabled={loading}
                        />

                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Сохранение...' : 'Редактировать пост'}
                    </button>

                </form>
            </div>

        </div>
    )
}

export default ChangePost;