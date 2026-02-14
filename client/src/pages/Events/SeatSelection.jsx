// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const SeatSelection = () => {
//   const { id: eventId } = useParams();
//   const navigate = useNavigate();

//   const [rows, setRows] = useState(6);
//   const [cols, setCols] = useState(10);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         const eventRes = await axios.get(`/api/events/${eventId}`);
//         setRows(eventRes.data.rows);
//         setCols(eventRes.data.columns);

//         const seatRes = await axios.get(
//           `/api/bookings/booked-seats/${eventId}`
//         );
//         setBookedSeats(seatRes.data);
//       } catch {
//         toast.error("Failed to load seats");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeats();
//   }, [eventId]);

//   if (loading) {
//     return <div className="pt-20 text-center">Loading seats...</div>;
//   }

//   const seats = Array.from({ length: rows * cols }, (_, i) => {
//     const seatNo = `R${Math.floor(i / cols) + 1}S${(i % cols) + 1}`;
//     return {
//       seatNo,
//       booked: bookedSeats.includes(seatNo),
//     };
//   });

//   return (
//     <div className="pt-20 px-3 sm:px-6 min-h-screen bg-gray-100">
//               <button
//         onClick={() => navigate(-1)}
//         className="mb-6 text-indigo-600 font-semibold"
//       >
//         ← Back
//       </button>
//       <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-2xl shadow">

//         <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-4 sm:mb-6 text-center sm:text-left">
//           Select Your Seat
//         </h1>

//         {/* 👇 MOBILE FRIENDLY SCROLL */}
//         <div className="overflow-x-auto mb-6">
//           <div
//             className="grid gap-2 sm:gap-3 justify-center min-w-max"
//             style={{ gridTemplateColumns: `repeat(${cols}, minmax(44px,1fr))` }}
//           >
//             {seats.map((seat) => (
//               <button
//                 key={seat.seatNo}
//                 disabled={seat.booked}
//                 onClick={() => setSelectedSeat(seat.seatNo)}
//                 className={`h-10 sm:h-12 rounded-lg text-[10px] sm:text-xs font-semibold
//                   transition
//                   ${
//                     seat.booked
//                       ? "bg-red-300 cursor-not-allowed text-white"
//                       : selectedSeat === seat.seatNo
//                       ? "bg-indigo-600 text-white scale-105"
//                       : "bg-gray-100 hover:bg-indigo-100"
//                   }`}
//               >
//                 {seat.seatNo}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* 👇 ACTION BAR */}
//         <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">

//           <p className="text-gray-600 text-center sm:text-left">
//             Selected Seat:{" "}
//             <span className="font-semibold text-indigo-600">
//               {selectedSeat || "None"}
//             </span>
//           </p>

//           <button
//             disabled={!selectedSeat}
//             onClick={() =>
//               navigate(`/events/${eventId}/payment`, {
//                 state: { seat: selectedSeat },
//               })
//             }
//             className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl
//                        disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatSelection;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const SeatSelection = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(10);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const eventRes = await axios.get(`/api/events/${eventId}`);
        setRows(eventRes.data.rows);
        setCols(eventRes.data.columns);

        const seatRes = await axios.get(
          `/api/bookings/booked-seats/${eventId}`,
        );
        setBookedSeats(seatRes.data);
      } catch {
        toast.error("Failed to load seats");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500 animate-pulse">Loading seats...</p>
      </div>
    );
  }

  const seats = Array.from({ length: rows * cols }, (_, i) => {
    const seatNo = `R${Math.floor(i / cols) + 1}S${(i % cols) + 1}`;
    return {
      seatNo,
      booked: bookedSeats.includes(seatNo),
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 md:px-10">
      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl font-semibold text-gray-900">
          Select Your Seat
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Choose your preferred seat before proceeding
        </p>
      </div>

      {/* ================= SEAT CARD ================= */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-10">
        {/* SCREEN INDICATOR */}
        <div className="mb-10 text-center">
          <div className="w-full h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full mb-3" />
          <p className="text-xs text-gray-400 tracking-wide uppercase">
            Screen This Way
          </p>
        </div>

        {/* SEAT GRID */}
        <div className="overflow-x-auto mb-10">
          <div
            className="grid gap-3 justify-center min-w-max"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(42px, 1fr))`,
            }}
          >
            {seats.map((seat) => {
              const isBooked = seat.booked;
              const isSelected = selectedSeat === seat.seatNo;

              return (
                <button
                  key={seat.seatNo}
                  disabled={isBooked}
                  onClick={() => setSelectedSeat(seat.seatNo)}
                  className={`h-11 rounded-lg text-[11px] font-medium transition-all duration-200
                    ${
                      isBooked
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isSelected
                          ? "bg-indigo-600 text-white shadow-md scale-105"
                          : "bg-gray-100 hover:bg-indigo-100 hover:scale-105"
                    }`}
                >
                  {seat.seatNo}
                </button>
              );
            })}
          </div>
        </div>

        {/* LEGEND */}
        <div className="flex flex-wrap gap-6 justify-center mb-10 text-sm">
          <Legend color="bg-gray-100" label="Available" />
          <Legend color="bg-indigo-600" label="Selected" />
          <Legend color="bg-gray-300" label="Booked" />
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-col sm:flex-row gap-6 sm:justify-between sm:items-center border-t pt-6">
          <div className="text-sm text-gray-600">
            Selected Seat:
            <span className="ml-2 font-semibold text-indigo-600">
              {selectedSeat || "None"}
            </span>
          </div>

          <button
            disabled={!selectedSeat}
            onClick={() =>
              navigate(`/events/${eventId}/payment`, {
                state: { seat: selectedSeat },
              })
            }
            className="bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= LEGEND COMPONENT ================= */

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 rounded ${color}`} />
    <span className="text-gray-600">{label}</span>
  </div>
);

export default SeatSelection;
