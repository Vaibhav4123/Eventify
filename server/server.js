
import dotenv from "dotenv";
dotenv.config(); // ✅ FIRST LINE (IMPORTANT)

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { connectDB } from "./config/db.js";

import bookingRoutes from "./routes/bookingRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
import organizerRoutes from "./routes/organizerRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/bookings", bookingRoutes); // ONLY ONCE
app.use("/api/organizer", organizerRoutes);






app.get("/", (req, res) => {
  res.send("API running...");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
});
