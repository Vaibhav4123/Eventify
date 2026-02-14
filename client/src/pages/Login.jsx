import React from "react";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
      {/* Center wrapper adapts to viewport height */}
      <div className="flex items-center justify-center px-3 py-6 sm:py-10 md:py-20">
        <div
          className="
            w-full
            max-w-4xl
            bg-white
            rounded-3xl
            shadow-2xl
            overflow-hidden
            flex
            flex-col
            md:flex-row
          "
        >
          {/* Left Image / Pattern */}
          <div
            className="
              md:w-1/2
              h-36
              sm:h-44
              md:h-auto
              relative
            "
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Event Management"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-indigo-700/60 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Event Manager
                </h2>
                <p className="text-xs sm:text-sm md:text-base opacity-90">
                  Plan • Organize • Execute
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div
            className="
              md:w-1/2
              px-6
              py-8
              sm:px-8
              sm:py-10
              md:p-10
              flex
              flex-col
              justify-center
            "
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              Welcome Back 👋
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mb-5 sm:mb-7">
              Login to manage your events
            </p>

            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 sm:p-4 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 sm:p-4 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <div className="flex justify-between items-center mb-5 text-xs sm:text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot?
              </a>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 rounded-xl font-semibold transition">
              Login
            </button>

            <p className="text-center text-gray-600 text-xs sm:text-sm mt-5 sm:mt-7">
              Don’t have an account?{" "}
              <a href="/signup" className="text-indigo-600 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
