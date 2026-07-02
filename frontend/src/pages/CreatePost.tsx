
import { useState } from "react";
import api from "../services/api";


interface iPost {
    title: string,
    content: string,
}

interface iErrors {
    title?: string,
    content?: string,
}

const CreatePostPage = () => {

    // Для данных
    const [postForm, setPostForm] = useState<iPost>({
        title: '',
        content: '',
    });
    const [errors, setErrors] = useState<iErrors>({});


    // Измененпя
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPostForm({
            ...postForm,
            [e.target.name]: e.target.value,
        });

        setErrors(prev => ({...prev, [e.target.name]: undefined}));
    }


    // Отправка
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        
        const newErrors: {title?: string, content?: string} = {};
        
        // Валидация
        if (postForm.title.length < 5) {
            newErrors.title = 'Название должно содержать минимум 5 символов';
        }
        
        if (postForm.content.length < 50 || postForm.content.length > 5000) {
            newErrors.content = 'Контент должен быть от 50 до 5000 символов';
        }
        

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; 
        }
        

        setErrors({});
        
        api.post('/posts', postForm)
            .then(res => {
                console.log(res.data);

                setPostForm({
                    title: '',
                    content: '',
                });
            })
            .catch(err => {
                console.log(err);
                setErrors({content: 'Ошибка при отправке данных'});
            });
    };


    return(
        <div className="flex justify-center items-center w-full min-h-[80vh]">

            <div className="w-full max-w-125 p-4 rounded-sm border border-gray-700 bg-gray-800 ">

                <h1 className="text-4xl font-bold text-center mb-6 gradient-text text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-gray-600">Создать пост</h1>
                
                {/* Форма с данными */}
                <form onSubmit={handleSubmit} className="space-y-4">


                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400">Название поста</label>
                        <input
                            name="title"
                            value={postForm.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 max-h-12 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.title ? 'border-red-500' : 'border-gray-600'}`}
                            placeholder="Название"
                        />
                        
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-400 ">Контент</label>
                        <textarea
                            name="content"
                            value={postForm.content}
                            onChange={handleChange}
                            rows={8}
                            maxLength={5000}
                            className={`w-full px-4 py-2 max-h-62.5 bg-gray-700/50 border rounded-lg justify-start 
                            text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.content ? 'border-red-500' : 'border-gray-600'}`}
                            placeholder="Контент"
                        />

                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                    </div>

                    
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Создать пост
                    </button>

                </form>
            </div>

        </div>
        

    )
}


export default CreatePostPage;