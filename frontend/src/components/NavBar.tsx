import { Link } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
}

const NavBar = (props: { projectName: string }) => {
  const navItems: NavItem[] = [
    { path: "/", label: "Главная" },
    { path: "/create", label: "Написать пост" },
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
      </ul>


      {/* Кнопка для входа */}
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
    </div>
  );
};

export default NavBar;