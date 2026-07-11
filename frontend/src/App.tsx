import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import './index.css'

// Страницы
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import CreatePost from './pages/CreatePost.tsx';
import Contacts from './pages/Contacts.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import PostPage from './pages/PostPage.tsx';
import ChangePost from './pages/ChangePost.tsx'
import FeedbackPage from './pages/FeedbackPage.tsx';

// Для вложенного роутинга
import AdminStats from './pages/admin/AdminStats.tsx';
import AdminProfile from './pages/admin/AdminProfile.tsx';
import AdminPosts from './pages/admin/AdminPosts.tsx';
import AdminUsers from './pages/admin/AdminUsers.tsx';
import AdminFeedback from './pages/admin/AdminFeedback.tsx';



function AppContent() {
  const location = useLocation();
  
  // Страницы где НЕ показываем навбар
  const hideNavbarRoutes = ['/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#16171d]">
      {showNavbar && (
        <div className="sticky top-0 z-50">
          <NavBar projectName="Мой блог" />
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts-change/:id" element={<ChangePost />} />          
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/posts/:id' element={<PostPage />} />
          <Route path='/contacts/:id' element={<FeedbackPage />} />


          {/* Вложенный роут */}
          <Route path="/adminpanel" element={<AdminPanel />} >
            <Route index element={<AdminStats />} />

            <Route path="stats" element={<AdminStats />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="feedback" element={<AdminFeedback />} />
          </Route>

        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;