import express from "express";

import { dashboard } from "../controllers/dashboardController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, dashboard);

export default router;




