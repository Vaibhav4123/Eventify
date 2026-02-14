import Booking from "../models/Booking.js";

/* ================= GET MY BOOKINGS ================= */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
      status: "paid",
    })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};



export const getBookedSeats = async (req, res) => {
  try {
    const bookings = await Booking.find({
      event: req.params.eventId,
      status: "paid",
    }).select("seatNumber");

    res.json(bookings.map(b => b.seatNumber));
  } catch {
    res.status(500).json({ message: "Failed to fetch booked seats" });
  }
};




export const getTicket = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("user", "name email")
    .populate("event");

  if (!booking) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  const isUser = booking.user._id.toString() === req.user.id;
  const isOrganizer =
    booking.event.organizer.toString() === req.user.id;

  if (!isUser && !isOrganizer) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(booking);
};




export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("user", "name email")
    .populate("event", "title organizer");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const isUser = booking.user._id.toString() === req.user.id;
  const isOrganizer =
    booking.event.organizer.toString() === req.user.id;

  if (!isUser && !isOrganizer) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(booking);
};



// POST /api/bookings/:id/use
export const markTicketUsed = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("event");

    if (!booking) {
      return res.status(404).json({ message: "Invalid ticket" });
    }

    // Organizer ownership check
    if (booking.event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your event" });
    }

    if (booking.used) {
      return res.status(400).json({
        message: "Ticket already used",
        usedAt: booking.usedAt,
      });
    }

    booking.used = true;
    booking.usedAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: "Entry allowed",
      seat: booking.seatNumber,
      attendee: booking.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to validate ticket" });
  }
};
