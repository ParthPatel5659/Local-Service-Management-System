const Booking = require("../Models/BookingModel");
const Service = require("../Models/ServiceModel");
const User = require("../Models/UserModel");

const getDashboard = async (req, res) => {
  try {
    const { role, id } = req.user;

    let data = {};

    // 🔵 ADMIN DASHBOARD
    if (role === "admin") {
      const totalUsers = await User.countDocuments();
      const totalProviders = await User.countDocuments({ role: "provider" });
      const totalBookings = await Booking.countDocuments();

      data = {
        totalUsers,
        totalProviders,
        totalBookings
      };
    }

    // 🟢 USER DASHBOARD
    if (role === "user") {
      const myBookings = await Booking.find({ userId: id })
        .populate("serviceId");

      data = { myBookings };
    }

    // 🟡 PROVIDER DASHBOARD
    if (role === "provider") {
      const myServices = await Service.find({ providerId: id });
      const myBookings = await Booking.find({ providerId: id });

      data = {
        myServices,
        myBookings
      };
    }

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboard };