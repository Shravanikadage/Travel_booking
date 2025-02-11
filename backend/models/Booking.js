const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  from: String,
  to: String,
  date: String,
  adults: Number,
  children: Number
});

module.exports = mongoose.model("Booking", bookingSchema);
