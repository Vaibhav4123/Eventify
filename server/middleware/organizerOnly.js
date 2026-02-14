// middleware/organizerOnly.js
const organizerOnly = (req, res, next) => {
  if (req.user.role !== "organizer") {
    return res.status(403).json({
      message: "Only organizers can perform this action",
    });
  }
  next();
};

export default organizerOnly;
