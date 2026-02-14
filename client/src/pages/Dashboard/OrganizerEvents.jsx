









// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const OrganizerEvents = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("/api/organizer/events", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then(res => setEvents(res.data));
//   }, []);

//   return (
//     <div className="pt-20 px-6 min-h-screen bg-gray-100">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 text-indigo-600 font-semibold"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold text-indigo-600 mb-6">
//         My Events
//       </h1>

//       <div className="grid md:grid-cols-2 gap-6">
//         {events.map(event => (
//           <div
//             key={event._id}
//             className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
//           >
//             <h2 className="text-xl font-bold">{event.title}</h2>
//             <p className="text-gray-500">{event.date}</p>

//             {/* 📊 STATS */}
//             <div className="mt-3 text-sm text-gray-700 space-y-1">
//               <p>
//                 👥 Registrations:{" "}
//                 <strong>{event.totalRegistrations}</strong>
//               </p>
//               <p>
//                 💰 Revenue:{" "}
//                 <strong className="text-green-600">
//                   ₹{event.totalRevenue}
//                 </strong>
//               </p>
//             </div>

//             <button
//               onClick={() =>
//                 navigate(
//                   `/dashboard/organizer/events/${event._id}/registrations`
//                 )
//               }
//               className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
//             >
//               View Registrations
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrganizerEvents;












import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3 } from "lucide-react";

const OrganizerEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/organizer/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setEvents(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500 animate-pulse">
          Loading your events...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 md:px-10">

      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              My Events
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage registrations and performance
            </p>
          </div>

          {/* SUMMARY */}
          <div className="bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Events
            </p>
            <p className="text-2xl font-semibold text-indigo-600 mt-1">
              {events.length}
            </p>
          </div>
        </div>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {events.length === 0 && (
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <BarChart3 size={24} />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            No events found
          </h2>

          <p className="text-sm text-gray-500">
            Start creating events to track registrations and revenue.
          </p>
        </div>
      )}

      {/* ================= EVENTS GRID ================= */}
      {events.length > 0 && (
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="group bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* TITLE */}
              <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                {event.title}
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                📅 {event.date?.split("T")[0]}
              </p>

              {/* STATS */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Registrations
                  </span>
                  <span className="font-medium text-gray-900">
                    {event.totalRegistrations}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Revenue
                  </span>
                  <span className="font-medium text-green-600">
                    ₹{event.totalRevenue}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                onClick={() =>
                  navigate(
                    `/dashboard/organizer/events/${event._id}/registrations`
                  )
                }
                className="w-full bg-indigo-600 text-white rounded-full py-2.5 text-sm font-medium hover:bg-indigo-700 transition"
              >
                View Registrations
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerEvents;
