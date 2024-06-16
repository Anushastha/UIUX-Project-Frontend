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

import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/user/Landing';
// import NavBar from './components/NavBar';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminColleges from './pages/admin/AdminColleges';
// import AdminCourses from './pages/admin/AdminCourses';
import UserDashboard from './pages/user/UserDashboard';
import LoginRegister from './pages/LoginRegister';
import NavBar from './components/NavBar';
import ListAnimation from './components/ListAnimation';


function Layout() {
  const location = useLocation();
  const showNavBar = !['/login', '/register', '/auth'].includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Outlet />
      <ToastContainer />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user/dashboard" element={<UserDashboard />} />
          <Route path="auth" element={<LoginRegister />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/colleges" element={<AdminColleges />} />
          <Route path="animation" element={<ListAnimation />} />
          {/* <Route path="admin/courses" element={<AdminCourses />} /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
