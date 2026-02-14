import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);

        let hour = "12";
        let minute = "00";
        let ampm = "AM";

        if (res.data.time) {
          const [timePart, period] = res.data.time.split(" ");
          const [h, m] = timePart.split(":");
          hour = h;
          minute = m;
          ampm = period;
        }

        setForm({
          title: res.data.title,
          category: res.data.category,
          date: res.data.date
            ? new Date(res.data.date).toISOString().split("T")[0]
            : "",
          hour,
          minute,
          ampm,
          location: res.data.location,
          venue: res.data.venue,
          mapUrl: res.data.mapUrl,
          image: res.data.image,
          price: res.data.price,
          rows: res.data.rows,
          columns: res.data.columns,
          description: res.data.description,
        });
      } catch {
        toast.error("Event not found");
        navigate("/events/myEvents");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const fullTime = `${form.hour}:${form.minute} ${form.ampm}`;

      Object.keys(form).forEach((key) => {
        if (key !== "hour" && key !== "minute" && key !== "ampm") {
          formData.append(key, form[key]);
        }
      });

      formData.append("time", fullTime);

      await axios.put(`/api/events/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Event updated successfully 🎉");
      navigate("/events/myEvents");
    } catch {
      toast.error("Failed to update event");
    }
  };

  if (loading || !form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500 animate-pulse">Loading event...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 sm:pt-24 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-indigo-600 hover:underline mb-4"
          >
            ← Back
          </button>

          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Edit Event
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Update event details and save changes
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm
                     p-5 sm:p-8 space-y-6 sm:space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <FormInput
              label="Event Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <FormSelect
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
            <FormInput
              label="Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />

            {/* TIME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <select
                  name="hour"
                  value={form.hour}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  name="minute"
                  value={form.minute}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition"
                >
                  {["00", "15", "30", "45"].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <select
                  name="ampm"
                  value={form.ampm}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <FormInput
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
            <FormInput
              label="Venue"
              name="venue"
              value={form.venue}
              onChange={handleChange}
            />
            <FormInput
              label="Price (₹)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
            <FormInput
              label="Map URL"
              name="mapUrl"
              value={form.mapUrl}
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
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm"
              />
            </div>

            <FormInput
              label="Rows"
              name="rows"
              type="number"
              value={form.rows}
              onChange={handleChange}
            />
            <FormInput
              label="Seats per Row"
              name="columns"
              type="number"
              value={form.columns}
              onChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm text-gray-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition resize-none"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl
                         bg-indigo-600 text-white font-medium
                         hover:bg-indigo-700 transition"
            >
              Update Event
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl
                         border border-gray-300 text-gray-700
                         hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* INPUT COMPONENT */
const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-xl border border-gray-200
                 px-4 py-3 text-base sm:text-sm text-gray-800
                 focus:ring-2 focus:ring-indigo-100
                 focus:border-indigo-300 outline-none transition"
    />
  </div>
);

/* SELECT COMPONENT */
const FormSelect = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      {...props}
      className="w-full rounded-xl border border-gray-200
                 px-4 py-3 text-base sm:text-sm text-gray-800
                 focus:ring-2 focus:ring-indigo-100
                 focus:border-indigo-300 outline-none transition"
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

export default EditEvent;
