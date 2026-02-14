import React from "react";
import Navbar from "../components/Navbar";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex flex-col">
      <Navbar />

      {/* Full-height content (minus navbar) */}
      <div className="flex-1 flex justify-center items-center px-3">
        <div
          className="
            w-full
            max-w-5xl
            bg-white
            rounded-3xl
            shadow-2xl
            overflow-hidden
            flex
            flex-col
            md:flex-row
            min-h-[80vh]
          "
        >
          {/* Left Image / Pattern */}
          <div className="md:w-1/2 relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1515169067865-5387ec356754"
              alt="Signup Event"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-indigo-700/60 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h2 className="text-4xl font-bold mb-3">Join Event Manager</h2>
                <p className="text-lg opacity-90">
                  Create • Manage • Experience events
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:w-1/2 flex flex-col justify-center px-6 py-10 sm:px-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account 🚀
            </h3>
            <p className="text-gray-500 mb-8">
              Start managing your events in minutes
            </p>

            <input
              type="text"
              placeholder="Full name"
              className="w-full p-4 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full p-4 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border rounded-xl mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition">
              Create Account
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-medium">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
