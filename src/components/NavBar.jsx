// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// const NavBar = () => {
//   // making useState
//   const [isMenuOpen, setisMenuOpen] = useState(false);
//   const handleMenuToggler = () => {
//     setisMenuOpen(!isMenuOpen);
//   };

//   const navItems = [
//     { path: "/admin/dashboard", title: "Home" },
//     { path: "/admin/colleges", title: "Colleges" },
//     { path: "/admin/courses", title: "Courses" },
//     { path: "/admin/dashboard", title: "Blogs" },
//   ];
//   return (
//     <>
//       <div>
//         <header>
//           <nav>
//             <a href="/" className="flex items-center gap-2 text-2xl">
//               <img
//                 src="/assets/images/logo.png"
//                 alt="Logo"
//                 height="120"
//                 width="150"
//               />
//             </a>
//             {/* nav items for  large screen */}
//             <ul>
//               {navItems.map(({ path, title }) => (
//                 <li key={path} className="text-base text-primary">
//                   <NavLink
//                     to={path}
//                     className={({ isActive }) => isActive ? "active" : ""
//                     }
//                   >{ }</NavLink>
//                 </li>
//               ))}
//             </ul>
//             <a href="/admin/colleges">Colleges</a>
//             <a href="/admin/courses">Courses</a>
//           </nav>
//         </header>
//       </div>
//     </>
//   );
// };

// export default NavBar;

// // // src/components/Navbar.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const NavBar = () => (
// //   <nav>
// //     <ul>
// //       <li><Link to="/colleges">Colleges</Link></li>
// //       <li><Link to="/courses">Courses</Link></li>
// //     </ul>
// //   </nav>
// // );

// // export default NavBar;
import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              height="120"
              width="150"
            />{" "}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                height="120"
                width="150"
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link active mx-lg-2"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#">
                    Colleges
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#">
                    Courses
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
