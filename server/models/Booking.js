import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentId: String,
    orderId: String,
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    used: {
      type: Boolean,
      default: false,
    },

    usedAt: Date,

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);


