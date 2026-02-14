// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Payment = () => {
//   const { state } = useLocation();
//   const { id: eventId } = useParams();
//   const navigate = useNavigate();

//   const seat = state?.seat;

//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await axios.get(`/api/events/${eventId}`);
//         setEvent(res.data);
//       } catch {
//         toast.error("Failed to load event");
//         navigate("/events");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [eventId, navigate]);

//   if (!seat) {
//     return (
//       <div className="pt-20 min-h-screen flex items-center justify-center text-red-500">
//         No seat selected
//       </div>
//     );
//   }

//   if (loading || !event) {
//     return (
//       <div className="pt-20 min-h-screen flex items-center justify-center">
//         Loading payment details...
//       </div>
//     );
//   }

//   const handlePay = async () => {
//     try {
//       const { data } = await axios.post("/api/payment/create-order", {
//         eventId,
//         seatNumber: seat,
//       });

//       if (data.isFree) {
//         toast.success("🎉 Registered successfully");
//         navigate("/dashboard/user/my-bookings");
//         return;
//       }

//       const options = {
//         key: data.key,
//         amount: data.order.amount,
//         currency: "INR",
//         name: "Eventify",
//         description: data.eventTitle,
//         order_id: data.order.id,
//         handler: async (response) => {
//           await axios.post("/api/payment/verify", {
//             ...response,
//             bookingId: data.bookingId,
//           });
//           toast.success("Payment successful 🎉");
//           navigate("/dashboard/user/my-bookings");
//         },
//         theme: { color: "#4f46e5" },
//       };

//       new window.Razorpay(options).open();
//     } catch {
//       toast.error("Payment failed");
//     }
//   };

//   return (
//     <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">

//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">
//             {event.title}
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Confirm your booking
//           </p>
//         </div>

//         {/* SUMMARY CARD */}
//         <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">Seat</span>
//             <span className="font-semibold">{seat}</span>
//           </div>

//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">Event Type</span>
//             <span className="font-semibold">
//               {event.price === 0 ? "Free" : "Paid"}
//             </span>
//           </div>

//           <div className="flex justify-between text-lg font-bold border-t pt-3">
//             <span>Total Amount</span>
//             <span className="text-indigo-600">
//               {event.price === 0 ? "₹0" : `₹${event.price}`}
//             </span>
//           </div>
//         </div>

//         {/* CTA */}
//         <button
//           onClick={handlePay}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl
//                      text-lg font-semibold transition active:scale-95"
//         >
//           {event.price === 0 ? "Register Now" : "Pay Securely"}
//         </button>

//         {/* FOOTER */}
//         <p className="text-xs text-gray-400 text-center mt-4">
//           🔒 100% Secure Payment powered by Razorpay
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const Payment = () => {
  const { state } = useLocation();
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const seat = state?.seat;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${eventId}`);
        setEvent(res.data);
      } catch {
        toast.error("Failed to load event");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, navigate]);

  if (!seat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-red-500">
        No seat selected
      </div>
    );
  }

  if (loading || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500 animate-pulse">
          Loading payment details...
        </p>
      </div>
    );
  }

  const handlePay = async () => {
    try {
      const { data } = await axios.post("/api/payment/create-order", {
        eventId,
        seatNumber: seat,
      });

      if (data.isFree) {
        toast.success("🎉 Registered successfully");
        navigate("/dashboard/user/my-bookings");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Eventify",
        description: data.eventTitle,
        order_id: data.order.id,
        handler: async (response) => {
          await axios.post("/api/payment/verify", {
            ...response,
            bookingId: data.bookingId,
          });
          toast.success("Payment successful 🎉");
          navigate("/dashboard/user/my-bookings");
        },
        theme: { color: "#4f46e5" },
      };

      new window.Razorpay(options).open();
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        {/* HEADER */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Confirm & Pay
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your booking details before proceeding
          </p>
        </div>

        {/* EVENT TITLE */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Seat</span>
            <span className="font-medium text-gray-900">{seat}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Event Type</span>
            <span className="font-medium text-gray-900">
              {event.price === 0 ? "Free Event" : "Paid Event"}
            </span>
          </div>

          <div className="flex justify-between text-base font-semibold border-t pt-4">
            <span>Total</span>
            <span className="text-indigo-600">
              {event.price === 0 ? "₹0" : `₹${event.price}`}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handlePay}
          className="w-full bg-indigo-600 text-white py-3 rounded-full text-sm font-semibold hover:bg-indigo-700 transition"
        >
          {event.price === 0 ? "Register Now" : "Pay Securely"}
        </button>

        {/* TRUST SECTION */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <ShieldCheck size={14} />
          <span>Secure payment powered by Razorpay</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
