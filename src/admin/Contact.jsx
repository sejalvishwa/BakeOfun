"use client";

import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const initialMessages = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      message:
        "I would like to know more about your premium bread products and bulk ordering options.",
      date: "2023-06-03",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      message:
        "The coconut cookies are amazing! My family loves them. Keep up the great work!",
      date: "2023-06-02",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      message:
        "We are a retail chain and would like to discuss partnership opportunities for distributing your products.",
      date: "2023-06-01",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      message:
        "I received a damaged package yesterday. The bread was completely crushed. Please help resolve this issue.",
      date: "2023-05-31",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      message:
        "Could you please provide detailed nutritional information for your milk rusk products?",
      date: "2023-05-30",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = initialMessages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              <tr key={msg.id}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{msg.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
