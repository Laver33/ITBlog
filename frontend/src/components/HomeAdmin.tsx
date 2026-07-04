import { Link } from "react-router-dom"




const HomeAdmin = () => {

    return(
    
    <div className='mt-5 bg-gray-900 rounded-sm shadow-lg border border-gray-700 px-2 pt-4 hover:shadow-blue-500/5 cursor-default'>
        
        <h2 className='mb-4 text-xl font-bold text-gray-300 bg-clip-text text-center'>
            Админ функции
        </h2>

        <div className='flex justify-evenly pb-4'>
            <Link
                to={'/create'}
                className='text-white px-3 py-2 bg-gray-700 hover:bg-gray-800 duration-700 rounded'
            >
                Написать пост
            </Link>

            <Link
                to={'/adminpanel'}
                className='text-white px-3 py-2 bg-gray-700 hover:bg-gray-800 duration-700 rounded'
            >
                Админ-панель
            </Link>
        </div>
    </div>
    )
}

export default HomeAdmin;