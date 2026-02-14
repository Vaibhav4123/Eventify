
import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

/* ================= CREATE ORDER ================= */

export const createOrder = async (req, res) => {
  try {
    const { eventId, seatNumber } = req.body;

    /* ================= 1️⃣ FETCH EVENT ================= */
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    /* ================= 2️⃣ PRICE HANDLING ================= */
    const amount = Number(event.price); // price is NUMBER
    const isFree = amount === 0;

    /* ================= 3️⃣ CREATE BOOKING ================= */
    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      seatNumber,
      amount,
      status: isFree ? "paid" : "pending",
    });

    /* ================= 4️⃣ FREE EVENT ================= */
    if (isFree) {
      return res.json({
        isFree: true,
        bookingId: booking._id,
        eventTitle: event.title,
        amount: 0,
      });
    }

    /* ================= 5️⃣ PAID EVENT (RAZORPAY) ================= */
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${booking._id}`,
    });

    // save orderId
    booking.orderId = order.id;
    await booking.save();

    res.json({
      isFree: false,
      key: process.env.RAZORPAY_KEY_ID,
      order,
      bookingId: booking._id,
      eventTitle: event.title,
      amount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};




export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  await Booking.findByIdAndUpdate(bookingId, {
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    status: "paid",
  });

  res.json({ success: true });
};
