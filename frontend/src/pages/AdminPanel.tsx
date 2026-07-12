import { NavLink, Outlet } from "react-router-dom";
import { useFetchAllData } from "../hooks/useFetchAllData";


interface iButtonsNavArrow {
    name: string;
    link: string;
}

const AdminPanel = () => {

    useFetchAllData()

    const btnNavArrow: iButtonsNavArrow[] = [
        {name: 'Статистика', link: 'stats'},
        {name: 'Профиль', link: 'profile'},              
        {name: 'Посты', link: 'posts'},            
        {name: 'Пользователи', link: 'users'},     
        {name: 'Фидбек', link: 'feedback'},  
    ]

    return (
        <div>
            
            {/* Кнопки для навигации */}
            <div className="flex justify-center gap-5">
                {btnNavArrow.map((btn, index) => {
                    return (
                        <NavLink 
                            to={btn.link} 
                            key={index}
                            className={({ isActive }) => 
                            isActive 
                            ? "bg-blue-600 px-5 py-3 rounded text-white" 
                            : "bg-gray-700 px-5 py-3 rounded text-white hover:bg-gray-800 duration-1000"
                        }
                        >
                        {btn.name}
                        </NavLink>
                    )
                })}
            </div>

            {/* Контент */}
            <div className="mt-12">
                <Outlet  />
            </div>

        </div>
    )
}

export default AdminPanel;