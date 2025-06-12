import { useState } from "react";
import axios from "axios";
import "./ContactUs.css";

export const ContactUs = ({ showHeading = true, mapSrc, stores = [] }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("Sending...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMsg("✅ Message sent successfully!");
      setFormData({
        full_name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setResponseMsg("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {showHeading && (
        <div className="contact-us-container">
          <h1>CONTACT US</h1>
        </div>
      )}

      {mapSrc && (
        <div className="map-section">
          <iframe
            title="Map Location"
            src={mapSrc}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      <div className="contact-flex">
        {/* Contact Form */}
        <div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name/Last Name
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </label>
            <label>
              E-mail
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                required
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write a message"
                required
              ></textarea>
            </label>
            <button type="submit">Send</button>
            {responseMsg && <p className="response-msg">{responseMsg}</p>}
          </form>
        </div>

        {/* Store Details */}
        <div className="store-details">
          {stores.map((store, index) => (
            <div className="contact-store" key={index}>
              {store.title && <h3>{store.title}</h3>}
              {store.address && <p>{store.address}</p>}
              {store.phone && (
                <p>
                  <strong>Phone:</strong> {store.phone}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
