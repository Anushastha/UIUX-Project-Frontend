import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Login from './pages/Login';
// import Register from './pages/Register';
import Landing from './pages/user/Landing';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminColleges from './pages/admin/AdminColleges';
import NavBar from './components/NavBar';
import ListAnimation from './components/ListAnimation';
import LoginRegister from './pages/LoginRegister'
import Colleges from './pages/user/Colleges';
import Courses from './pages/user/Courses';
import Blogs from './pages/user/Blogs';
import "./styles/index.css";
import Footer from './components/Footer';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminCourses from './pages/admin/AdminCourses';

function Layout() {
  const location = useLocation();
  const showNavBar = !location.pathname.startsWith('/auth');
  const showFooter = !location.pathname.startsWith('/auth');
  return (
    <>
      {showNavBar && <NavBar />}
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="user/colleges" element={<Colleges />} />
          <Route path="user/courses" element={<Courses />} />
          <Route path="user/blogs" element={<Blogs />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/colleges" element={<AdminColleges />} />
          <Route path="admin/courses" element={<AdminCourses />} />
          <Route path="admin/blogs" element={<AdminBlogs />} />
          <Route path="animation" element={<ListAnimation />} />
          <Route path="auth" element={<LoginRegister />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
