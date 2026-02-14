import React from "react";
import { Calendar, Users, Target, Star, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-white via-sky-50 to-blue-100 min-h-screen">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5
                         rounded-full bg-indigo-50 text-indigo-600
                         text-sm font-medium mb-6"
        >
          <Sparkles size={16} /> About Our Platform
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
          Smart Event Management, <br className="hidden md:block" />
          Built for Modern Teams
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          A modern and reliable Event Management System designed to help
          individuals, colleges, and organizations plan and manage events
          effortlessly.
        </p>
      </section>

      {/* WHO WE ARE */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-5">Who We Are</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide a powerful yet easy-to-use event management platform that
            simplifies the entire lifecycle of an event — from creation and
            registrations to attendee tracking and analytics — all in one place.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-8">
        <InfoCard
          icon={<Target size={34} />}
          title="Our Mission"
          desc="To simplify event management by using technology to automate tasks, improve coordination, and save valuable time."
        />
        <InfoCard
          icon={<Star size={34} />}
          title="Our Vision"
          desc="To become a trusted digital platform that empowers users to create impactful and memorable events with confidence."
        />
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
          What We Offer
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Feature
            icon={<Calendar size={30} />}
            title="Event Creation"
            desc="Create and manage events with full control over schedules, venues, and ticketing."
          />
          <Feature
            icon={<Users size={30} />}
            title="Attendee Management"
            desc="Track registrations, manage guest lists, and monitor participation effortlessly."
          />
          <Feature
            icon={<Star size={30} />}
            title="Smart Dashboard"
            desc="Get a clear overview of your events with real-time insights and analytics."
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Us
          </h2>

          <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
            Our platform is built with simplicity, scalability, and security at
            its core — making it suitable for both small gatherings and
            large-scale events.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "User-Friendly Interface",
              "Time-Saving Automation",
              "Secure & Reliable",
              "Scalable Architecture",
              "Modern Technology Stack",
            ].map((item) => (
              <span
                key={item}
                className="bg-indigo-50 text-indigo-700
                           px-5 py-2 rounded-full
                           text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Let’s Create Memorable Events Together
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Plan smarter, manage better, and deliver experiences people will
          remember.
        </p>
      </section>
    </div>
  );
};

/* ---------- SMALL COMPONENTS ---------- */

const Feature = ({ icon, title, desc }) => (
  <div
    className="bg-white p-6 rounded-2xl shadow-sm
                  hover:shadow-md transition text-center"
  >
    <div className="text-indigo-600 flex justify-center mb-4">{icon}</div>
    <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const InfoCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-3xl shadow-sm p-8">
    <div className="text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default About;
