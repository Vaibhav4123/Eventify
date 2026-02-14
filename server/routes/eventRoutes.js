import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createEvent,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getUpcomingEvents,
} from "../controllers/eventController.js";

import upload from "../middleware/upload.js";


const router = express.Router();

/* 🔐 Organizer Protected */
// router.post("/create", auth, createEvent);
router.post("/create", auth, upload.single("image"), createEvent);
router.get("/my", auth, getMyEvents);
// router.put("/:id", auth, updateEvent);
router.put("/:id", auth, upload.single("image"), updateEvent);
router.delete("/:id", auth, deleteEvent);
router.get("/", getAllEvents);
router.get("/upcoming", getUpcomingEvents);



/* 🌍 Public */
router.get("/:id", getEventById);

export default router;
