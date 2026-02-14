





// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const OrganizerDashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     totalEvents: 0,
//     ticketsSold: 0,
//     totalRevenue: 0,
//   });

//   useEffect(() => {
//     axios
//       .get("/api/organizer/stats", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then(res => setStats(res.data));
//   }, []);

//   return (
//     <div className="pt-20 px-6 min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold text-indigo-600 mb-1">
//         Organizer Dashboard
//       </h1>
//       <p className="text-gray-600 mb-8">
//         Welcome back, <strong>{user?.name}</strong>
//       </p>

//       {/* STATS */}
//       <div className="grid md:grid-cols-3 gap-6 mb-10">
//         <StatCard title="Total Events" value={stats.totalEvents} />
//         <StatCard title="Tickets Sold" value={stats.ticketsSold} />
//         <StatCard
//           title="Total Revenue"
//           value={`₹${stats.totalRevenue}`}
//         />
//       </div>

//       {/* ACTIONS */}
//       {/* <div className="bg-white p-6 rounded-xl shadow mb-10">
//         <h2 className="text-xl font-semibold mb-4">Event Management</h2>

//         <div className="grid sm:grid-cols-3 gap-4">
//           <ActionButton
//             label="Create Event"
//             primary
//             onClick={() => navigate("/events/create")}
//           />
//           <ActionButton
//             label="Registrations"
//             onClick={() =>
//               navigate("/dashboard/organizer/registrations")
//             }
//           />
//           <ActionButton
//             label="My Events"
//             onClick={() => navigate("/events/myEvents")}
//           />
//           <ActionButton
//             label="Scan Tickets"
//             highlight
//             onClick={() =>
//               navigate("/dashboard/organizer/scan")
//             }
//           />
//         </div>
//       </div> */}

//       {/* ================= QUICK ACTIONS ================= */}
// <div className="bg-white p-6 rounded-xl shadow mb-10">
//   <h2 className="text-xl font-semibold text-gray-800 mb-4">
//     Event Management
//   </h2>

//   <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
//     <ActionButton
//       label="Create New Event"
//       onClick={() => navigate("/events/create")}
//       primary
//     />

//     <ActionButton
//       label="My Events"
//       onClick={() => navigate("/events/myEvents")}
//     />

//     {/* ✅ NEW (does NOT affect others) */}
//     <ActionButton
//       label="Registrations"
//       onClick={() =>
//         navigate("/dashboard/organizer/registrations")
//       }
//     />

//     <ActionButton
//       label="Scan Tickets"
//       onClick={() => navigate("/dashboard/organizer/scan")}
//       highlight
//     />

  





//   </div>
// </div>



//     </div>
//   );
// };

// const StatCard = ({ title, value }) => (
//   <div className="bg-white p-6 rounded-xl shadow">
//     <p className="text-gray-500">{title}</p>
//     <h2 className="text-3xl font-bold text-indigo-600 mt-2">
//       {value}
//     </h2>
//   </div>
// );

// const ActionButton = ({ label, onClick, primary, highlight }) => {
//   let cls =
//     "px-6 py-3 rounded-xl font-medium transition";

//   if (primary)
//     cls += " bg-indigo-600 text-white hover:bg-indigo-700";
//   else if (highlight)
//     cls += " bg-green-600 text-white hover:bg-green-700";
//   else
//     cls += " bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50";

//   return (
//     <button onClick={onClick} className={cls}>
//       {label}
//     </button>
//   );
// };

// export default OrganizerDashboard;














import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  CalendarPlus,
  List,
  Ticket,
  ScanLine,
  IndianRupee,
  Menu,
} from "lucide-react";

const OrganizerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalEvents: 0,
    ticketsSold: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    axios
      .get("/api/organizer/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">



      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAVBAR */}
        {/* <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>

          <h1 className="text-2xl font-semibold text-gray-800">
            Organizer Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500">Welcome</p>
              <p className="font-semibold text-gray-800">
                {user?.name}
              </p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div> */}

        {/* PAGE CONTENT */}
        <div className="p-6 md:p-10">

          {/* STATS */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            <StatCard
              title="Total Events"
              value={stats.totalEvents}
              icon={<CalendarPlus size={20} />}
            />
            <StatCard
              title="Tickets Sold"
              value={stats.ticketsSold}
              icon={<Ticket size={20} />}
            />
            <StatCard
              title="Total Revenue"
              value={`₹${stats.totalRevenue}`}
              icon={<IndianRupee size={20} />}
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <ActionCard
                icon={<CalendarPlus />}
                label="Create Event"
                onClick={() => navigate("/events/create")}
              />
              <ActionCard
                icon={<List />}
                label="My Events"
                onClick={() => navigate("/events/myEvents")}
              />
              <ActionCard
                icon={<Ticket />}
                label="Registrations"
                onClick={() =>
                  navigate("/dashboard/organizer/registrations")
                }
              />
              <ActionCard
                icon={<ScanLine />}
                label="Scan Tickets"
                onClick={() =>
                  navigate("/dashboard/organizer/scan")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const SidebarItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition"
  >
    {icon}
    <span>{label}</span>
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
    <div className="flex items-center justify-between text-gray-500">
      <span className="text-sm font-medium">{title}</span>
      {icon}
    </div>
    <h2 className="text-3xl font-bold text-gray-800 mt-4">
      {value}
    </h2>
  </div>
);

const ActionCard = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-gray-50 hover:bg-indigo-50 p-6 rounded-xl border border-gray-200 transition hover:shadow-md flex flex-col items-center justify-center gap-3"
  >
    <div className="text-indigo-600">{icon}</div>
    <p className="font-medium text-gray-700">{label}</p>
  </div>
);

export default OrganizerDashboard;
