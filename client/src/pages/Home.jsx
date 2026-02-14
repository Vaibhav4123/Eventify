import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaMusic,
  FaLaptopCode,
  FaUniversity,
  FaVideo,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

const Home = () => {
  const [search, setSearch] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);



  useEffect(() => {
    axios
      .get("/api/events/upcoming")
      .then((res) => setUpcomingEvents(res.data))
      .catch(() => console.error("Failed to load events"));
  }, []);

  return (
    <div className="bg-gray-50">
      {/* <Navbar /> */}

      {/* HERO */}
      <section
        className="min-h-[90vh] flex items-center justify-center
                          bg-gradient-to-br from-white via-sky-50 to-blue-100
                          px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
            Discover & Manage <br /> Events Seamlessly
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Workshops • Concerts • College Events • Webinars
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 bg-white rounded-full flex shadow-xl overflow-hidden">
            <input
              type="text"
              placeholder="Search events or location..."
              className="flex-1 px-6 py-4 text-gray-700 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 text-white transition">
              <FaSearch />
            </button>
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <FaLaptopCode />, label: "Workshop" },
            { icon: <FaMusic />, label: "Concert" },
            { icon: <FaUniversity />, label: "College" },
            { icon: <FaVideo />, label: "Webinar" },
          ].map((cat) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={cat.label}
              className="bg-white rounded-2xl p-8 text-center shadow-md"
            >
              <div className="text-4xl text-indigo-600 mb-4">{cat.icon}</div>
              <h3 className="font-semibold">{cat.label}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-10">
          Upcoming Events
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {upcomingEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
