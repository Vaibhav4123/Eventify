import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Workshop",
        "Conference",
        "Concert",
        "Seminar",
        "Webinar",
        "College",
      ],
      required: true,
    },

    date: {
      type: Date, // keeping string to match UI like "12 Feb 2026"
      required: true,
    },

    time: {
      type: String, // e.g. "10:00 AM – 4:00 PM"
      required: true,
    },

    location: {
      type: String, // City, State
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    mapUrl: {
      type: String,
      required: true,
    },

    image: {
      type: String, // image URL
      required: true,
    },

    price: {
      type: Number, // "Free", "₹499"
      required: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },


    rows:{
      type: Number,
      required: true,
      min: [1, "Rows must be at least 1"],
    },
    columns: {
      type: Number,
      required: true,
      min: [1, "Columns must be at least 1"],
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);


