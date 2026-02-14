import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setEvent(res.data);
      } catch {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading event…
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Event not found</h2>
        <button
          onClick={() => navigate("/events")}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-white via-sky-50 to-blue-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 font-medium hover:underline"
        >
          ← Back to Events
        </button>

        {/* MAIN */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* IMAGE */}
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[360px] object-cover"
            />

            {/* BADGES */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-indigo-600">
                {event.category}
              </span>
              <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                {event.price === 0 ? "Free" : `₹${event.price}`}
              </span>
            </div>
          </div>

          {/* INFO */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              {event.title}
            </h1>

            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-600">
              <p>
                <strong>Date:</strong> {event.date?.split("T")[0]}
              </p>
              <p>
                <strong>Time:</strong> {event.time}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
              <p>
                <strong>Organizer:</strong> {event.organizer?.name}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => navigate(`/events/${event._id}/seats`)}
                className="bg-indigo-600 hover:bg-indigo-700
                           text-white px-6 py-2.5 rounded-lg
                           font-medium transition"
              >
                Register
              </button>

              {event.mapUrl && (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 text-sm font-medium hover:underline"
                >
                  View Map
                </a>
              )}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-12 max-w-4xl bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">
            About this event
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {event.description}
          </p>
        </div>

        {/* MAP */}
        {event.mapUrl && (
          <div className="mt-12 max-w-4xl">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              Location
            </h2>
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src={event.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Event location"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetails;
