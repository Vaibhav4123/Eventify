export const dashboard = (req, res) => {
  const { role, id } = req.user;

  if (role === "organizer") {
    return res.json({
      dashboard: "organizer",
      message: "Welcome Organizer",
      userId: id,
    });
  }

  res.json({
    dashboard: "user",
    message: "Welcome User",
    userId: id,
  });
};
