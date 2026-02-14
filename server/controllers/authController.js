


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";

/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = generateOTP();

    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: role || "user",
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail(
      email,
      "Verify your email (Eventify)",
      `Your OTP is ${otp}`
    );

    res.status(201).json({
      message: "Signup successful. OTP sent to email",
    });
  } catch {
    res.status(500).json({ message: "Signup failed" });
  }
};

/* ================= VERIFY OTP ================= */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // 🔥 ACTUAL VERIFICATION
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save({ validateBeforeSave: false });

    console.log("✅ USER VERIFIED:", user.email);

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // 🔥 ONLY BLOCK IF NOT VERIFIED
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified",
        requireOTP: true,
        email: user.email,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};





export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendEmail(email, "Reset Password OTP", `OTP: ${otp}`);
  res.json({ message: "OTP sent for password reset" });
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.otp !== otp || user.otpExpires < Date.now())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  user.otpExpires = null;
  user.isVerified=true;
  await user.save();

  res.json({ message: "Password reset successful" });
};
