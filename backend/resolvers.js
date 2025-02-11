const Booking = require("./models/Booking");

const resolvers = {
  Query: {
    getBookings: async () => {
      try {
        return await Booking.find();
      } catch (error) {
        console.error("Error fetching bookings:", error);
        throw new Error("Failed to fetch bookings");
      }
    },
  },
  Mutation: {
    addBooking: async (_, { name, email, phone, from, to, date, adults, children }) => {
      try {
        const newBooking = new Booking({ name, email, phone, from, to, date, adults, children });
        await newBooking.save();
        return newBooking;
      } catch (error) {
        console.error("Error adding booking:", error);
        throw new Error("Failed to add booking");
      }
    },
  },
};

module.exports = resolvers;
