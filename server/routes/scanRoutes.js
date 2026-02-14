// routes/scanRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js";
import { scanTicket } from "../controllers/scanController.js";

const router = express.Router();

router.post("/scan", auth, scanTicket);

export default router;
