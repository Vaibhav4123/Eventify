import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 md:px-10">

      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl font-semibold text-gray-900">
          My Profile
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account settings
        </p>
      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-8">

        <div className="flex flex-col md:flex-row gap-10">

          {/* AVATAR SECTION */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-28 h-28 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-semibold shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <span
              className={`mt-4 px-4 py-1 rounded-full text-xs font-medium ${
                user.role === "organizer"
                  ? "bg-green-100 text-green-700"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {user.role === "organizer"
                ? "Organizer"
                : "User"}
            </span>
          </div>

          {/* INFO SECTION */}
          <div className="flex-1">

            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {user.email}
            </p>

            {/* ACCOUNT DETAILS */}
            <div className="mt-8 grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Account Type</p>
                <p className="font-medium text-gray-900 mt-1">
                  {user.role === "organizer"
                    ? "Event Organizer"
                    : "Event Attendee"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900 mt-1">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                disabled
                className="px-6 py-2.5 rounded-full text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
              >
                Edit Profile (Coming Soon)
              </button>

              <button
                onClick={() =>
                  navigate(
                    user.role === "organizer"
                      ? "/dashboard/organizer"
                      : "/dashboard/user"
                  )
                }
                className="px-6 py-2.5 rounded-full text-sm font-medium border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INFO PANEL ================= */}
      <div className="max-w-5xl mx-auto mt-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Account Notes
        </h3>

        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Your email is used for ticket confirmations.</li>
          <li>• Profile editing will be available soon.</li>
          <li>• Keep your account secure.</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
