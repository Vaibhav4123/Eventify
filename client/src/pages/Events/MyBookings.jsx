import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/bookings/my");
        setBookings(res.data);
      } catch {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500 animate-pulse">
          Loading your bookings...
        </p>
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No bookings yet
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          Discover upcoming events and reserve your seat in minutes.
        </p>
        <button
          onClick={() => navigate("/events")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-sm font-medium transition shadow-sm"
        >
          Explore Events
        </button>
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
              My Bookings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your registered events
            </p>
          </div>

          {/* SUMMARY */}
          <div className="bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Bookings
            </p>
            <p className="text-2xl font-semibold text-indigo-600 mt-1">
              {bookings.length}
            </p>
          </div>
        </div>
      </div>

      {/* ================= BOOKINGS GRID ================= */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* IMAGE */}
            <div className="relative h-44 bg-gray-100 overflow-hidden">
              <img
                src={booking.event.image}
                alt={booking.event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <span className="absolute top-4 right-4 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                {booking.amount === 0 ? "Free" : `₹${booking.amount}`}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                {booking.event.title}
              </h2>

              <div className="text-sm text-gray-500 space-y-1">
                <p>📅 {booking.event.date}</p>
                <p className="truncate">
                  📍 {booking.event.venue}, {booking.event.location}
                </p>
              </div>

              <p className="text-sm mt-3">
                Seat:
                <span className="ml-1 font-medium text-indigo-600">
                  {booking.seatNumber}
                </span>
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => navigate(`/events/${booking.event._id}`)}
                  className="flex-1 border border-indigo-600 text-indigo-600 rounded-full py-2 text-sm font-medium hover:bg-indigo-50 transition"
                >
                  View Event
                </button>

                <button
                  onClick={() => navigate(`/ticket/${booking._id}`)}
                  className="flex-1 bg-indigo-600 text-white rounded-full py-2 text-sm font-medium hover:bg-indigo-700 transition"
                >
                  View Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
