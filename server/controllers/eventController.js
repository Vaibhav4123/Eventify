import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";

/* ================= CREATE EVENT ================= */


export const createEvent = async (req, res) => {
  try {
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Event image is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "events",
      }
    );

    const event = await Event.create({
      ...req.body,
      image: result.secure_url,
      date: new Date(req.body.date),
      organizer: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create event" });
  }
};



/* ================= GET MY EVENTS ================= */
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id })
      .sort({ createdAt: -1 });

    res.json(events);
  } catch {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/* ================= GET EVENT BY ID ================= */
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch {
    res.status(500).json({ message: "Failed to fetch event" });
  }
};



/* ================= UPDATE EVENT ================= */


export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let imageUrl = event.image;

    // If new image uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "events",
        }
      );

      imageUrl = result.secure_url;
    }

    Object.assign(event, {
      ...req.body,
      date: new Date(req.body.date), // 🔥 IMPORTANT
      image: imageUrl,
    });

    await event.save();

    res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update event" });
  }
};





export const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();

    const events = await Event.find({
      date: { $gte: today },
    })
      .sort({ date: 1 }) // nearest first
      .limit(3);

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch upcoming events" });
  }
};














/* ================= DELETE EVENT ================= */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete event" });
  }
};



// eventController.js
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name")
      .sort({ createdAt: -1 });

    res.json(events);
  } catch {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};
