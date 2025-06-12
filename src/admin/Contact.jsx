"use client";

import { useState, useEffect } from "react";
import "./Contact.css";
import axios from "axios";

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from API
  useEffect(() => {
    const getContactData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Sort messages by most recent date
        const sortedMessages = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setError("Failed to fetch contact data");
      }
    };

    getContactData();
  }, []);

  // Filter messages based on search term
  const filteredMessages = messages.filter(
    (msg) =>
      msg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="banners-container">
      <div className="banners-header">
        <h1 className="page-title">Contacts</h1>
      </div>
      <div className="contact-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error ? (
          <p className="error">{error}</p>
        ) : messages.length === 0 ? (
          <p className="loading">Loading messages...</p>
        ) : (
          <table className="contact-table">
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg, index) => (
                <tr key={msg._id}>
                  <td>{index + 1}</td>
                  <td>{msg.full_name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>{msg.createdAt?.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Contact;
