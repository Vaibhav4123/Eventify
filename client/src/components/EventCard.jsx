import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EventCard = ({ event, showEdit = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const canEdit = showEdit || user?.id === event.organizer?._id;

  return (
    <div
      onClick={() => navigate(`/events/${event._id}`)}
      className="group cursor-pointer
                 rounded-[28px] overflow-hidden
                 bg-white/90 backdrop-blur
                 border border-gray-200/60
                 shadow-md
                 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover
                     transition-transform duration-500
                     group-hover:scale-105"
        />

        {/* CATEGORY BADGE */}
        <span
          className="absolute top-4 left-4
                         bg-white/90 backdrop-blur
                         text-indigo-600 text-xs font-medium
                         px-4 py-1.5 rounded-full shadow-sm"
        >
          {event.category}
        </span>

        {/* PRICE / FREE */}
        <span
          className="absolute top-4 right-4
                         bg-white/90 backdrop-blur
                         text-gray-900 text-xs font-semibold
                         px-4 py-1.5 rounded-full shadow-sm"
        >
          {event.price === 0 ? "Free" : `₹${event.price}`}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
          {event.title}
        </h2>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            📅 {event.date} • ⏰ {event.time}
          </p>
          <p className="truncate">
            📍 {event.venue}, {event.location}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/events/${event._id}`);
            }}
            className="flex-1 rounded-xl py-2.5 text-sm font-medium
                       bg-indigo-600 text-white
                       hover:bg-indigo-700
                       transition active:scale-95"
          >
            View Details
          </button>

          {canEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/events/edit/${event._id}`);
              }}
              className="flex-1 rounded-xl py-2.5 text-sm font-medium
                         border border-indigo-600 text-indigo-600
                         hover:bg-indigo-50 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
