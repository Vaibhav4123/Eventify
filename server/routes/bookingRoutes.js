import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getBookedSeats, getMyBookings, getTicket, markTicketUsed } from "../controllers/bookingController.js";
import organizerOnly from "../middleware/organizerOnly.js";

const router = express.Router();

router.get("/my", auth, getMyBookings);
router.get("/booked-seats/:eventId", getBookedSeats);
router.get("/:id", auth, getTicket);
router.post("/:id/use",auth,organizerOnly,markTicketUsed);


export default router;

