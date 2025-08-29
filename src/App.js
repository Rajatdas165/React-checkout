import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "UPI",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {!submitted ? (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Billing Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <h2>Payment Method</h2>
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          <h2>Order Summary</h2>
          <p>Items Total: ₹1,499</p>
          <p>Shipping: ₹50</p>
          <p><strong>Grand Total: ₹1,549</strong></p>

          <button type="submit">Place Order</button>
        </form>
      ) : (
        <div className="success-message">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you, {form.name}. Your order will be delivered soon.</p>
          <a className="back-link" href="https://rajatdas165.github.io/Ecommerce-Website/">← Back to store</a>
        </div>
      )}
    </div>
  );
}
