import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/user/Landing';
import AdminColleges from './pages/admin/AdminColleges';
import NavBar from './components/NavBar';
import ListAnimation from './components/ListAnimation'
import LoginRegister from './pages/LoginRegister';
import Colleges from './pages/user/Colleges';
import Courses from './pages/user/Courses';
import Blogs from './pages/user/Blogs';
import "./styles/index.css";
import Footer from './components/Footer';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminCourses from './pages/admin/AdminCourses';
import AdminEditCollege from './pages/admin/AdminEditCollege';
import AdminEditCourse from './pages/admin/AdminEditCourse';
import AdminEditBlogs from './pages/admin/AdminEditBlogs';
import BlogDetail from './pages/user/BlogDetail';
import CourseDetail from './pages/user/CourseDetail';
import ChangePassword from './pages/user/ChangePassword';
import EditProfile from './pages/user/EditProfile';
import UserProfile from './pages/user/UserProfile';
import CollegeDetail from './pages/user/CollegeDetail';
import SavedColleges from './pages/user/SavedColleges';

const PrivateRoute = ({ children, isAdmin }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/auth?mode=login" />;
  }
  if (isAdmin && user && !user.isAdmin) {
    return <Navigate to="/user/colleges" />;
  }
  if (!isAdmin && user && user.isAdmin) {
    return <Navigate to="/admin/colleges" />;
  }
  return children;
};

function Layout() {
  const location = useLocation();
  const showNavBar = !location.pathname.startsWith('/auth') &&
    !location.pathname.startsWith('/user/changePassword') &&
    !location.pathname.startsWith('/user/editProfile') &&
    !location.pathname.startsWith('/user/userProfile');

  const showFooter = !location.pathname.startsWith('/auth') &&
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/user/changePassword') &&
    !location.pathname.startsWith('/user/editProfile') &&
    !location.pathname.startsWith('/user/userProfile');

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
          <Route path="auth" element={<LoginRegister />} />

          <Route path="user/colleges" element={<PrivateRoute><Colleges /></PrivateRoute>} />
          <Route path="user/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
          <Route path="user/blogs" element={<PrivateRoute><Blogs /></PrivateRoute>} />
          <Route path="user/blogs/blogDetails/:id" element={<PrivateRoute><BlogDetail /></PrivateRoute>} />
          <Route path="user/courses/courseDetails/:id" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
          <Route path="user/colleges/collegeDetails/:id" element={<PrivateRoute><CollegeDetail /></PrivateRoute>} />
          <Route path="user/changePassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          <Route path="user/editProfile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route path="user/userProfile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="user/colleges/savedColleges" element={<PrivateRoute><SavedColleges /></PrivateRoute>} />

          <Route path="admin/colleges" element={<PrivateRoute isAdmin={true}><AdminColleges /></PrivateRoute>} />
          <Route path="admin/courses" element={<PrivateRoute isAdmin={true}><AdminCourses /></PrivateRoute>} />
          <Route path="admin/blogs" element={<PrivateRoute isAdmin={true}><AdminBlogs /></PrivateRoute>} />
          <Route path="admin/colleges/editCollege/:id" element={<PrivateRoute isAdmin={true}><AdminEditCollege /></PrivateRoute>} />
          <Route path="admin/courses/editCourse/:id" element={<PrivateRoute isAdmin={true}><AdminEditCourse /></PrivateRoute>} />
          <Route path="admin/blogs/editBlog/:id" element={<PrivateRoute isAdmin={true}><AdminEditBlogs /></PrivateRoute>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
