import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const categories = [
  "All",
  "Workshop",
  "Concert",
  "College",
  "Webinar",
  "Seminar",
  "Conference",
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/events");
        setEvents(res.data);
      } catch {
        console.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      activeCategory === "All" || event.category === activeCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      {/* ================= HEADER ================= */}
      <section className="pt-24 pb-32 px-6 text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Explore Events
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover workshops, conferences, and events that match your interests
        </p>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="max-w-4xl mx-auto px-6 -mt-20">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-full
                 border border-gray-200 shadow-lg
                 focus:ring-2 focus:ring-indigo-200
                 bg-white
                 outline-none text-gray-700"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </section>

      {/* ================= CATEGORY FILTER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition
                ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-indigo-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= EVENTS GRID ================= */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No events found matching your search.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;
