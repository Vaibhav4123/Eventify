




// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   return (
//     <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 sm:px-6">

//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto mb-10">
//         <div className="bg-white/80 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-md">
//           <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
//             Welcome back 👋
//           </h1>
//           <p className="text-gray-700 mt-2">
//             {user?.name}
//           </p>
//           <p className="text-sm text-gray-500">
//             {user?.email}
//           </p>
//         </div>
//       </div>

//       {/* DASHBOARD CARDS */}
//       <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

//         {/* MY BOOKINGS */}
//         <div
//           onClick={() => navigate("/dashboard/user/my-bookings")}
//           className="group bg-white rounded-3xl p-6 shadow-lg cursor-pointer
//                      hover:shadow-xl transition transform hover:-translate-y-1"
//         >
//           <div className="text-4xl mb-4">🎟️</div>
//           <h2 className="text-xl font-bold text-indigo-600 mb-2">
//             My Bookings
//           </h2>
//           <p className="text-gray-600 mb-4">
//             View events you have registered for
//           </p>
//           <span className="text-sm font-semibold text-indigo-500 group-hover:underline">
//             View bookings →
//           </span>
//         </div>

//         {/* EXPLORE EVENTS */}
//         <div
//           onClick={() => navigate("/events")}
//           className="group bg-white rounded-3xl p-6 shadow-lg cursor-pointer
//                      hover:shadow-xl transition transform hover:-translate-y-1"
//         >
//           <div className="text-4xl mb-4">🔍</div>
//           <h2 className="text-xl font-bold text-indigo-600 mb-2">
//             Explore Events
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Discover and register for upcoming events
//           </p>
//           <span className="text-sm font-semibold text-indigo-500 group-hover:underline">
//             Browse events →
//           </span>
//         </div>

//         {/* PROFILE */}
//         <div
//           onClick={() => navigate("/profile")}
//           className="group bg-white rounded-3xl p-6 shadow-lg cursor-pointer
//                      hover:shadow-xl transition transform hover:-translate-y-1"
//         >
//           <div className="text-4xl mb-4">👤</div>
//           <h2 className="text-xl font-bold text-indigo-600 mb-2">
//             My Profile
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Manage your account information
//           </p>
//           <span className="text-sm font-semibold text-indigo-500 group-hover:underline">
//             View profile →
//           </span>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
















import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Ticket, Search, User } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 md:px-10">
      
      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Welcome back,
            </h1>
            <p className="text-lg text-indigo-600 font-medium mt-1">
              {user?.name}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {user?.email}
            </p>
          </div>

          {/* Avatar */}
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-semibold shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* ================= ACTION CARDS ================= */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <ActionCard
          icon={<Ticket size={22} />}
          title="My Bookings"
          description="View events you have registered for"
          buttonText="View bookings"
          onClick={() => navigate("/dashboard/user/my-bookings")}
        />

        <ActionCard
          icon={<Search size={22} />}
          title="Explore Events"
          description="Discover and register for upcoming events"
          buttonText="Browse events"
          onClick={() => navigate("/events")}
        />

        <ActionCard
          icon={<User size={22} />}
          title="My Profile"
          description="Manage your account information"
          buttonText="View profile"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

/* ================= ACTION CARD ================= */

const ActionCard = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white border border-gray-100 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition">
        {icon}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h2>

      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        {description}
      </p>

      <span className="text-sm font-medium text-indigo-600 group-hover:underline">
        {buttonText} →
      </span>
    </div>
  );
};

export default UserDashboard;
