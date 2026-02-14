// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const EventRegistrations = () => {
//   const { eventId } = useParams();
//   const [data, setData] = useState(null);
//   const navigate=useNavigate();
//   useEffect(() => {
//     axios
//       .get(`/api/organizer/events/${eventId}/registrations`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then(res => setData(res.data));
//   }, [eventId]);

//   if (!data) return null;

//   return (
//     <div className="pt-20 px-6 min-h-screen bg-gray-100">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 text-indigo-600 font-semibold"
//         >
//           ← Back
//         </button>
//       <h1 className="text-3xl font-bold text-indigo-600 mb-2">
//         {data.eventTitle}
//       </h1>

//       <p className="mb-6 text-gray-600">
//         Total Registrations: {data.totalRegistrations}
//       </p>

//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-indigo-50">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Seat</th>
//               <th className="p-3 text-left">Amount</th>
//               <th className="p-3 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.registrations.map(b => (
//               <tr key={b._id} className="border-t">
//                 <td className="p-3">{b.user.name}</td>
//                 <td className="p-3">{b.user.email}</td>
//                 <td className="p-3">{b.seatNumber}</td>
//                 <td className="p-3">
//                   {b.amount === 0 ? "Free" : `₹${b.amount}`}
//                 </td>
//                 <td className="p-3">
//                   {b.used ? "Used" : "Not Used"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EventRegistrations;






















import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const EventRegistrations = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/organizer/events/${eventId}/registrations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [eventId]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm animate-pulse">
          Loading registrations...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 md:px-10">
      
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              {data.eventTitle}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage attendee registrations
            </p>
          </div>

          {/* Summary Card */}
          <div className="bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Registrations
            </p>
            <p className="text-2xl font-semibold text-indigo-600 mt-1">
              {data.totalRegistrations}
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500 font-medium">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Seat</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.registrations.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-gray-50 transition"
                >
                  {/* USER COLUMN */}
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {b.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {b.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {b.user.email}
                      </p>
                    </div>
                  </td>

                  {/* SEAT */}
                  <td className="px-6 py-4 text-gray-700">
                    {b.seatNumber}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4 text-gray-700">
                    {b.amount === 0 ? (
                      <span className="text-green-600 font-medium">
                        Free
                      </span>
                    ) : (
                      `₹${b.amount}`
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.used
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.used ? "Used" : "Not Used"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrations;
