
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";

/* ================= ORGANIZER EVENTS ================= */
export const getOrganizerEvents = async (req, res) => {
  const events = await Event.find({ organizer: req.user.id })
    .sort({ createdAt: -1 });

  res.json(events);
};

/* ================= EVENT REGISTRATIONS ================= */
export const getEventRegistrations = async (req, res) => {
  const { eventId } = req.params;

  const bookings = await Booking.find({
    event: eventId,
    status: "paid",
  }).populate("user", "name email");

  const event = await Event.findById(eventId);

  res.json({
    eventTitle: event.title,
    totalRegistrations: bookings.length,
    registrations: bookings,
  });
};

/* ================= ORGANIZER STATS ================= */
export const getOrganizerStats = async (req, res) => {
  const events = await Event.find({ organizer: req.user.id });
  const eventIds = events.map(e => e._id);

  const bookings = await Booking.find({
    event: { $in: eventIds },
    status: "paid",
  });

  const ticketsSold = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);

  res.json({
    totalEvents: events.length,
    ticketsSold,
    totalRevenue,
  });
};








export const getOrganizerEventsWithStats = async (req, res) => {
  try {
    const organizerId = req.user.id;

    const events = await Event.find({ organizer: organizerId });

    const enrichedEvents = await Promise.all(
      events.map(async (event) => {
        const bookings = await Booking.find({
          event: event._id,
          status: "paid",
        });

        const totalRegistrations = bookings.length;
        const totalRevenue = bookings.reduce(
          (sum, b) => sum + b.amount,
          0
        );

        return {
          ...event.toObject(),
          totalRegistrations,
          totalRevenue,
        };
      })
    );

    res.json(enrichedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load events" });
  }
};