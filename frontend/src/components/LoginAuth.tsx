import { Link } from "react-router-dom"



const LoginAuth = () => {
    return(
    
    <div className="whitespace-nowrap">
        <Link 
          to="/login" 
          className="text-sm sm:text-base md:text-lg text-white no-underline transition-colors
                     px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 bg-black rounded-2xl shadow-lg shadow-gray-900
                     inline-block hover:text-red-600 duration-1000 hover:animate-pulse"
        >
          Вход
        </Link>
      </div>

    )
}

export default LoginAuth;