import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Workshop",
    date: "",
    hour: "10",
    minute: "00",
    ampm: "AM",
    location: "",
    venue: "",
    mapUrl: "",
    image: "",
    price: "",
    rows: 6,
    columns: 10,
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const formData = new FormData();

  //     Object.keys(form).forEach((key) => {
  //       formData.append(key, form[key]);
  //     });

  //     await axios.post("/api/events/create", formData, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     toast.success("Event created successfully 🎉");
  //     navigate("/dashboard/organizer");
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Failed to create event");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Combine time
      const fullTime = `${form.hour}:${form.minute} ${form.ampm}`;

      Object.keys(form).forEach((key) => {
        if (key !== "hour" && key !== "minute" && key !== "ampm") {
          formData.append(key, form[key]);
        }
      });

      formData.append("time", fullTime);

      await axios.post("/api/events/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Event created successfully 🎉");
      navigate("/dashboard/organizer");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 font-medium hover:underline mb-4"
          >
            ← Back
          </button>

          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Create New Event
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details to publish a new event
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur
                     border border-gray-200/60
                     rounded-[28px]
                     shadow-sm
                     p-8 space-y-6"
        >
          {/* BASIC INFO */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Event Title"
              name="title"
              required
              onChange={handleChange}
            />
            <Select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            />

            <Input
              label="Date"
              name="date"
              type="date"
              required
              onChange={handleChange}
            />
            {/* <Input label="Time" name="time" type="time" required onChange={handleChange} /> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>

              <div className="grid grid-cols-3 gap-3">
                {/* Hour */}
                <select
                  name="hour"
                  value={form.hour}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-200 px-4 py-3"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                {/* Minute */}
                <select
                  name="minute"
                  value={form.minute}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-200 px-4 py-3"
                >
                  {["00", "15", "30", "45"].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* AM / PM */}
                <select
                  name="ampm"
                  value={form.ampm}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-200 px-4 py-3"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <Input
              label="Location"
              name="location"
              placeholder="City, State"
              required
              onChange={handleChange}
            />
            <Input
              label="Venue"
              name="venue"
              placeholder="Venue name"
              required
              onChange={handleChange}
            />

            <Input
              label="Price (₹)"
              name="price"
              placeholder="0 for Free"
              required
              onChange={handleChange}
            />
            <Input
              label="Google Maps URL"
              name="mapUrl"
              onChange={handleChange}
            />

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
                required
              />
            </div>

            {/* SEAT CONFIG */}
            <Input
              label="Rows"
              type="number"
              min="1"
              name="rows"
              value={form.rows}
              onChange={handleChange}
            />
            <Input
              label="Seats per Row"
              type="number"
              min="1"
              name="columns"
              value={form.columns}
              onChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Description
            </label>
            <textarea
              name="description"
              rows={4}
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200
                         px-4 py-3 text-sm text-gray-800
                         focus:ring-2 focus:ring-indigo-100
                         focus:border-indigo-300 outline-none"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl
                         bg-indigo-600 text-white
                         font-medium hover:bg-indigo-700
                         transition active:scale-95
                         disabled:opacity-70"
            >
              {loading ? "Creating…" : "Create Event"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/organizer")}
              className="px-8 py-3 rounded-xl
                         border border-gray-300
                         text-gray-700 hover:bg-gray-100
                         transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* REUSABLE INPUT */
const Input = ({ label, className = "", ...props }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-xl border border-gray-200
                 px-4 py-3 text-sm text-gray-800
                 focus:ring-2 focus:ring-indigo-100
                 focus:border-indigo-300 outline-none"
    />
  </div>
);

/* CATEGORY SELECT */
const Select = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      {...props}
      className="w-full rounded-xl border border-gray-200
                 px-4 py-3 text-sm text-gray-800
                 focus:ring-2 focus:ring-indigo-100
                 focus:border-indigo-300 outline-none"
    >
      <option>Workshop</option>
      <option>Conference</option>
      <option>Concert</option>
      <option>Seminar</option>
      <option>Webinar</option>
      <option>College</option>
    </select>
  </div>
);

export default CreateEvent;
