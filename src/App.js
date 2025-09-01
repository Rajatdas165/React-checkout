import React, { useState, useEffect } from "react";
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
  const [cart, setCart] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0); 
  const [finalCart, setFinalCart] = useState([]); // ✅ store cart snapshot

  // Read cart from localStorage when app loads
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Calculate totals
  const itemsTotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    return sum + price * qty;
  }, 0);

  const shipping = cart.length > 0 ? 50 : 0;
  const grandTotal = itemsTotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Save snapshot before clearing
    setFinalTotal(grandTotal);
    setFinalCart(cart);

    localStorage.removeItem("cart"); 
    setCart([]); 
    setSubmitted(true);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {!submitted ? (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Billing Details</h2>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} required />

          <h2>Payment Method</h2>
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          <h2>Order Summary</h2>
          <ul>
            {cart.map((item, index) => {
              const price = Number(item.price) || 0;
              const qty = Number(item.qty) || 0;
              return (
                <li key={index}>
                  {item.name} × {qty} = ₹{price * qty}
                </li>
              );
            })}
          </ul>
          <p>Items Total: ₹{itemsTotal}</p>
          <p>Shipping: ₹{shipping}</p>
          <p><strong>Grand Total: ₹{grandTotal}</strong></p>

          <button type="submit">Place Order</button>
        </form>
      ) : (
        <div className="success-message">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>
            Thank you, {form.name}. Your order of ₹{finalTotal} will be delivered soon.
          </p>

          <h3>🛍️ Ordered Items:</h3>
          <ul>
            {finalCart.map((item, index) => (
              <li key={index}>
                {item.name} × {item.qty} = ₹{Number(item.price) * Number(item.qty)}
              </li>
            ))}
          </ul>

          <a className="back-link" href="https://rajatdas165.github.io/Ecommerce-Website/">
            ← Back to store
          </a>
        </div>
      )}
    </div>
  );
}
