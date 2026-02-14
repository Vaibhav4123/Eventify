import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import EventCard from "../../components/EventCard";

const MyEvents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH MY EVENTS ================= */
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get("/api/events/my");
        setEvents(res.data);
      } catch {
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 text-center text-gray-500">
        Loading your events...
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 min-h-screen bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 font-semibold"
      >
        ← Back
      </button>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-600">My Events</h1>
        <p className="text-gray-600">
          Events created by <span className="font-semibold">{user?.name}</span>
        </p>
      </div>

      {/* EMPTY STATE */}
      {events.length === 0 && (
        <div className="text-center bg-white p-10 rounded-xl shadow">
          <p className="text-gray-500 mb-4">
            You haven’t created any events yet.
          </p>
          <button
            onClick={() => navigate("/events/create")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Create Your First Event
          </button>
        </div>
      )}

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            showEdit={true} // 🔥 My events → always editable
          />
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
