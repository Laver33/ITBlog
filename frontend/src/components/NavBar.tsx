import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeaderUser from "./HaderAuth";
import LoginAuth from "./LoginAuth";


interface NavItem {
  path: string;
  label: string;
}

const NavBar = (props: { projectName: string }) => {

  const { isAuthenticated, user } = useAuth();

  const navItems: NavItem[] = [
    { path: "/", label: "Главная" },
    { path: "/about", label: "О проекте" },
    { path: "/contacts", label: "Контакты" },
    { path: "/stats", label: "Статистика" },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-4 md:px-6">

      {/* Название проекта */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white whitespace-nowrap">
        <Link to="/">{props.projectName}</Link>
      </h1>
      

      {/* Меню */}
      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-12 list-none 
                   bg-black py-2 px-3 sm:py-3 sm:px-4 md:py-4 md:px-6 rounded-2xl shadow-lg shadow-gray-900 max-w-[70%]">
        {navItems.map((item) => (
          <li key={item.path} className="whitespace-nowrap">
            <Link 
              to={item.path} 
              className="text-sm sm:text-base md:text-lg text-white hover:text-gray-200 no-underline transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}

        {user?.role == 'admin' ? 
        <li  className="whitespace-nowrap">
          <Link 
              to={'/adminpanel'} 
              className="text-sm sm:text-base md:text-lg text-white hover:text-gray-200 no-underline transition-colors"
            >
              Админ-панель
            </Link>
          </li> : null}

      </ul>


      {/* Кнопка для входа либо уже авторизованный пользователь */}

      {isAuthenticated ? <HeaderUser /> : <LoginAuth /> }
      
    </div>
  );
};

export default NavBar;