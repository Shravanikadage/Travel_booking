import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "./BookingForm.css";

const ADD_BOOKING = gql`
  mutation AddBooking(
    $name: String!,
    $email: String!,
    $phone: String!,
    $from: String!,
    $to: String!,
    $date: String!,
    $adults: Int!,
    $children: Int!
  ) {
    addBooking(
      name: $name,
      email: $email,
      phone: $phone,
      from: $from,
      to: $to,
      date: $date,
      adults: $adults,
      children: $children
    ) {
      id
      name
    }
  }
`;

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    date: "",
    adults: 1,
    children: 0,
  });

  const [addBooking, { loading, error }] = useMutation(ADD_BOOKING);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooking({ variables: { ...formData, adults: parseInt(formData.adults), children: parseInt(formData.children) } });
      alert("Booking Successful!");
      setFormData({ name: "", email: "", phone: "", from: "", to: "", date: "", adults: 1, children: 0 });
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div className="container">
      <h1 className="booking-title">Travel Booking</h1>
      <div className="booking-form">
        <form onSubmit={handleSubmit}>
          <div className="section">
            <h3>Personal Details</h3>
            <h2>Name</h2>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <h2>Email</h2>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <h2>Phone No.</h2>
            <input type="text" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="section">
            <h3>Traveling Details</h3>
            <div className="travel-details">
              <div className="input-group">
                <h2>From</h2>
                <select name="from" value={formData.from} onChange={handleChange} required>
                  <option value="">Select Location</option>
                  <option value="Bali">Bali</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Manali">Manali</option>
                  <option value="Kashmir">Kashmir</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Goa">Goa</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Jaipur">Jaipur</option>
                </select>
              </div>
              <div className="input-group">
                <h2>To</h2>
                <select name="to" value={formData.to} onChange={handleChange} required>
                  <option value="">Select Destination</option>
                  <option value="Bali">Bali</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Manali">Manali</option>
                  <option value="Kashmir">Kashmir</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Goa">Goa</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Jaipur">Jaipur</option>
                </select>
              </div>
            </div>

            <h2>Date</h2>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="section">
            <h3>Passengers</h3>
            <div className="passenger-details">
              <div className="input-group">
                <h2>Adults</h2>
                <select name="adults" value={formData.adults} onChange={handleChange} required>
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <h2>Children</h2>
                <select name="children" value={formData.children} onChange={handleChange}>
                  {[...Array(6).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading && <p className="loading-text">Processing...</p>}
          {error && <p className="error-text">Booking failed. Try again.</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
