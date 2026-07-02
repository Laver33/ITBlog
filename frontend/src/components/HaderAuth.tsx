import { useAuth } from "../context/AuthContext";




const HeaderUser = () => { 

    const { logout } = useAuth();

    return(
        <button 
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-white"
        >
            Выйти
        </button>
    )
}


export default HeaderUser;



// Другой стиль

        // <div className="py-2 px-4 flex items-center justify-center gap-3 bg-black rounded-2xl shadow-lg shadow-gray-900">

        //     <span className="text-white text-lg font-normal">
        //         {user?.name} {user?.lastName}
        //     </span>

        //     <button 
        //         onClick={logout}
        //         className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
        //     >
        //         Выйти
        //     </button>

        // </div>