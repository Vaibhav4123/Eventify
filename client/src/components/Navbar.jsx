// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const {
//     user,
//     logout,
//     isOrganizer,
//     userDashboardPath,
//     organizerDashboardPath,
//   } = useAuth();

//   const navigate = useNavigate();

//   const activeClass = "text-indigo-600 font-semibold";
//   const normalClass = "text-gray-700 hover:text-indigo-600 transition";

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) setOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/auth");
//     setOpen(false);
//   };

//   // 🔥 ROLE-BASED DASHBOARD PATH
//   const dashboardPath = isOrganizer
//     ? organizerDashboardPath
//     : userDashboardPath;

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
//           {/* LOGO */}
//           <h1 className="text-2xl font-bold text-indigo-600">Eventify</h1>

//           {/* DESKTOP MENU */}
//           <div className="hidden lg:flex items-center space-x-8 font-medium">
//             <NavLink
//               to="/"
//               end
//               className={({ isActive }) =>
//                 isActive ? activeClass : normalClass
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/events"
//               className={({ isActive }) =>
//                 isActive ? activeClass : normalClass
//               }
//             >
//               Events
//             </NavLink>
//             <NavLink
//               to="/about"
//               className={({ isActive }) =>
//                 isActive ? activeClass : normalClass
//               }
//             >
//               About
//             </NavLink>

//             {/* AUTH / DASHBOARD */}
//             {!user ? (
//               <NavLink
//                 to="/auth"
//                 className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700"
//               >
//                 Login
//               </NavLink>
//             ) : (
//               <>
//                 <NavLink
//                   to={dashboardPath}
//                   className={({ isActive }) =>
//                     isActive ? activeClass : normalClass
//                   }
//                 >
//                   Dashboard
//                 </NavLink>

//                 {/* <button
//                   onClick={handleLogout}
//                   className="text-red-500 font-medium cursor-pointer"
//                 >Logout
//                 </button> */}

//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 text-black hover:text-red-500 transition"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-5 h-5"
//                   >
//                     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                     <polyline points="16 17 21 12 16 7" />
//                     <line x1="21" y1="12" x2="9" y2="12" />
//                   </svg>

//                   <span className="text-sm font-medium">Logout</span>
//                 </button>
//               </>
//             )}
//           </div>

//           {/* MOBILE ICON */}
//           <button onClick={() => setOpen(true)} className="lg:hidden text-3xl">
//             ☰
//           </button>
//         </div>
//       </nav>

//       {/* BACKDROP */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="h-16 flex items-center justify-between px-6 border-b">
//           <h2 className="text-xl font-bold text-indigo-600">Menu</h2>
//           <button onClick={() => setOpen(false)} className="text-2xl">
//             ✕
//           </button>
//         </div>

//         <div className="flex flex-col space-y-6 px-6 pt-8 text-lg font-medium">
//           <NavLink
//             to="/"
//             onClick={() => setOpen(false)}
//             className={normalClass}
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/events"
//             onClick={() => setOpen(false)}
//             className={normalClass}
//           >
//             Events
//           </NavLink>
//           <NavLink
//             to="/about"
//             onClick={() => setOpen(false)}
//             className={normalClass}
//           >
//             About
//           </NavLink>

//           {!user ? (
//             <NavLink
//               to="/auth"
//               onClick={() => setOpen(false)}
//               className="bg-indigo-600 text-white text-center py-3 rounded-xl"
//             >
//               Login
//             </NavLink>
//           ) : (
//             <>
//               <NavLink
//                 to={dashboardPath}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   isActive ? activeClass : normalClass
//                 }
//               >
//                 Dashboard
//               </NavLink>

//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 text-black hover:text-red-500 transition"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="w-5 h-5"
//                 >
//                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                   <polyline points="16 17 21 12 16 7" />
//                   <line x1="21" y1="12" x2="9" y2="12" />
//                 </svg>

//                 <span className="text-sm font-medium">Logout</span>
//               </button>
//             </>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {
    user,
    logout,
    isOrganizer,
    userDashboardPath,
    organizerDashboardPath,
  } = useAuth();

  const navigate = useNavigate();
  const profileRef = useRef();

  const dashboardPath = isOrganizer
    ? organizerDashboardPath
    : userDashboardPath;

  const activeClass =
    "text-indigo-600 font-semibold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-indigo-600";

  const normalClass = "text-gray-700 hover:text-indigo-600 transition relative";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth");
    setProfileOpen(false);
    setOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full h-16 backdrop-blur-lg bg-white/70 border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* LOGO */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer tracking-tight"
          >
            Eventify
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8 font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Events
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              About
            </NavLink>

            {!user ? (
              <NavLink
                to="/auth"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-sm"
              >
                Login
              </NavLink>
            ) : (
              <div
                ref={profileRef}
                className="relative flex items-center gap-3 cursor-pointer"
              >
                {/* DASHBOARD LINK */}
                <NavLink
                  to={dashboardPath}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Dashboard
                </NavLink>

                {/* AVATAR */}
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-md">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={16} />
                </div>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 top-14 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 transition"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE ICON */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-gray-700"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-6 px-6 pt-8 font-medium">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={normalClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            onClick={() => setOpen(false)}
            className={normalClass}
          >
            Events
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={normalClass}
          >
            About
          </NavLink>

          {!user ? (
            <NavLink
              to="/auth"
              onClick={() => setOpen(false)}
              className="bg-indigo-600 text-white text-center py-3 rounded-xl"
            >
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                to={dashboardPath}
                onClick={() => setOpen(false)}
                className={normalClass}
              >
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
