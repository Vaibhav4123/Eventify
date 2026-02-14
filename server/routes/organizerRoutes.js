// import express from "express";
// import auth from "../middleware/authMiddleware.js";
// import organizerOnly from "../middleware/organizerOnly.js";
// import {
//   getOrganizerStats,
//   getEventRegistrations,
// } from "../controllers/organizerController.js";

// const router = express.Router();

// router.get("/stats", auth, organizerOnly, getOrganizerStats);
// router.get("/events/:eventId/registrations",auth,organizerOnly,getEventRegistrations);
// // router.get("/registrations", auth, organizerOnly, getEventRegistrations);
// export default router;



import express from "express";
import auth from "../middleware/authMiddleware.js";
import organizerOnly from "../middleware/organizerOnly.js";
import {
  getOrganizerEvents,
  getEventRegistrations,
  getOrganizerStats,
  getOrganizerEventsWithStats,
} from "../controllers/organizerController.js";


const router = express.Router();


router.get("/events",auth,organizerOnly,getOrganizerEventsWithStats);
// router.get("/events", auth, organizerOnly, getOrganizerEvents);

router.get("/events/:eventId/registrations", auth, organizerOnly, getEventRegistrations);
router.get("/stats", auth, organizerOnly, getOrganizerStats);

export default router;
