
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import NavBar from './components/NavBar';
import './index.css'

// Страницы
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import CreatePost from './pages/CreatePost.tsx';
import Сontacts from './pages/Contacts.tsx';
import Stats from './pages/Stats.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#16171d]">

        <NavBar projectName="Мой блог" />

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/contacts" element={<Сontacts />} />
            <Route path="/stats" element={<Stats />} />

            {/* Вход и логин */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;
