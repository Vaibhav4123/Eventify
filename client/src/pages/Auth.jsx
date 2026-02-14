import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const {
    login,
    signup,
    verifyOTP,
    forgotPassword,
    resetPassword,
    loading,
    user,
    userDashboardPath,
    organizerDashboardPath,
  } = useAuth();

  const [mode, setMode] = useState(
    () => sessionStorage.getItem("auth_mode") || "login",
  );

  const updateMode = (m) => {
    sessionStorage.setItem("auth_mode", m);
    setMode(m);
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) {
      sessionStorage.removeItem("auth_mode");
      setMode("login");
    }
  }, [user]);

  const goToLogin = () => {
    sessionStorage.removeItem("auth_mode");
    setForm({
      name: "",
      email: "",
      password: "",
      role: "user",
      otp: "",
      newPassword: "",
    });
    setMode("login");
  };

  const Spinner = () => (
    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
  );

  // LOGIN
  const handleLogin = async () => {
    try {
      const u = await login(form.email, form.password);
      navigate(
        u.role === "organizer" ? organizerDashboardPath : userDashboardPath,
      );
    } catch (err) {
      if (err.message === "VERIFY_EMAIL") updateMode("otp");
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    await signup(form.name, form.email, form.password, form.role);
    updateMode("otp");
  };

  // VERIFY EMAIL
  const handleVerifyOTP = async () => {
    await verifyOTP(form.email, form.otp);
    goToLogin();
  };

  // FORGOT PASSWORD (SEND OTP)
  const handleForgotOTP = async () => {
    await forgotPassword(form.email);
    // setMode("reset");
    updateMode("reset"); // 🔥 IMPORTANT
  };

  // RESET PASSWORD
  const handleResetPassword = async () => {
    await resetPassword(form.email, form.otp, form.newPassword);
    goToLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        {/* BRAND */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Eventify</h1>
          <p className="text-sm text-gray-500 mt-1">
            Smart event management made simple
          </p>
        </div>

        {/* TOGGLE */}
        {(mode === "login" || mode === "signup") && (
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={goToLogin}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition
              ${
                mode === "login"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => updateMode("signup")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition
              ${
                mode === "signup"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Signup
            </button>
          </div>
        )}

        {/* LOGIN */}
        {mode === "login" && (
          <>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full mb-3 px-4 py-3 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700
                       text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? <Spinner /> : "Login"}
            </button>

            <button
              onClick={() => updateMode("forgot")}
              className="text-sm text-indigo-600 mt-4"
            >
              Forgot password?
            </button>
          </>
        )}

        {/* SIGNUP */}
        {mode === "signup" && (
          <>
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
            />

            <select
              name="role"
              onChange={handleChange}
              className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300"
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700
                       text-white py-3 rounded-lg font-medium"
            >
              {loading ? <Spinner /> : "Create account"}
            </button>
          </>
        )}

        {/* OTP */}
        {mode === "otp" && (
          <>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
            />

            <input
              name="otp"
              placeholder="OTP"
              onChange={handleChange}
              className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300"
            />

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg"
            >
              Verify
            </button>

            <button
              onClick={goToLogin}
              className="text-sm text-indigo-600 mt-4"
            >
              Back to login
            </button>
          </>
        )}

        {/* FORGOT */}
        {mode === "forgot" && (
          <>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300"
            />

            <button
              onClick={handleForgotOTP}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg"
            >
              Send OTP
            </button>

            <button
              onClick={goToLogin}
              className="text-sm text-indigo-600 mt-4"
            >
              Back to login
            </button>
          </>
        )}

        {/* RESET */}
        {mode === "reset" && (
          <>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
            />

            <input
              name="otp"
              placeholder="OTP"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
            />

            <input
              name="newPassword"
              type="password"
              placeholder="New password"
              onChange={handleChange}
              className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300"
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg"
            >
              Reset password
            </button>

            <button
              onClick={goToLogin}
              className="text-sm text-indigo-600 mt-4"
            >
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
