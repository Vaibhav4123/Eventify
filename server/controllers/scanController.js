// controllers/scanController.js
import Booking from "../models/Booking.js";

export const scanTicket = async (req, res) => {
  try {
    // 1️⃣ Only organizer allowed
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { bookingId } = req.body;

    // 2️⃣ Find booking
    const booking = await Booking.findById(bookingId).populate("event");

    if (!booking) {
      return res.status(404).json({ message: "Invalid ticket" });
    }

    // 3️⃣ Organizer must own this event
    if (booking.event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your event" });
    }

    // 4️⃣ Already used?
    if (booking.used) {
      return res.status(400).json({
        message: "Ticket already used",
        usedAt: booking.usedAt,
      });
    }

    // 5️⃣ Mark as used
    booking.used = true;
    booking.usedAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: "Ticket verified successfully",
      attendee: booking.user,
      seat: booking.seatNumber,
      event: booking.event.title,
    });
  } catch (err) {
    res.status(500).json({ message: "Scan failed" });
  }
};
