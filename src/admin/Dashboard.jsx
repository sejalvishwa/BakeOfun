"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import { config } from "../config/config";

const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Products",
      value: 0,
      icon: "inventory_2",
      color: "#0a2a8a",
    },
    {
      title: "Active Banners",
      value: 0,
      icon: "collections",
      color: "#ffc107",
    },
    {
      title: "Live Products",
      value: 0,
      icon: "visibility",
      color: "#28a745",
    },
    {
      title: "Contacts",
      value: 0,
      icon: "email",
      color: "#dc3545",
    },
  ]);

  const [recentMessages, setRecentMessages] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentContacts = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/contact`);
        const allContacts = response.data.data || [];

        const sorted = allContacts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setRecentMessages(sorted);

        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.title === "Contacts"
              ? { ...stat, value: allContacts.length }
              : stat
          )
        );
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts");
      }
    };

    const fetchBannersCount = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/banners`);
        const banners = response.data.data || [];

        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.title === "Active Banners"
              ? { ...stat, value: banners.length }
              : stat
          )
        );
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/products`);
        const allProducts = response.data.data || [];

        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.title === "Total Products"
              ? { ...stat, value: allProducts.length }
              : stat
          )
        );

        const sortedRecent = allProducts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setRecentProducts(sortedRecent);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchLiveProductsCount = async () => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}/api/live-products`
        );
        const liveProducts = response.data.data || [];
        const activeCount = liveProducts.filter((p) => p.isActive).length;

        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.title === "Live Products"
              ? { ...stat, value: activeCount }
              : stat
          )
        );
      } catch (err) {
        console.error("Error fetching live products:", err);
      }
    };

    // Call all data fetching functions
    fetchRecentContacts();
    fetchBannersCount();
    fetchProducts();
    fetchLiveProductsCount();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              <span className="material-icons">{stat.icon}</span>
            </div>
            <div className="stat-info">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Recent Products */}
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "#10256F" }}>
            <h2 className="card-title" style={{ color: "#ffffff" }}>
              Recent Products
            </h2>
            <Link to="/admin/products" className="btn btn-primary">
              View All
            </Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product._id}>
                    <td>#{product._id.slice(-4)}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          product.status?.toLowerCase() || "active"
                        }`}
                      >
                        {product.status || "Active"}
                      </span>
                    </td>
                    <td>{product.createdAt?.substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "#10256F" }}>
            <h2 className="card-title" style={{ color: "#ffffff" }}>
              Recent Contacts
            </h2>
            <Link to="/admin/contact" className="btn btn-primary">
              View All
            </Link>
          </div>
          <div className="table-container">
            {error ? (
              <p className="error">{error}</p>
            ) : recentMessages.length === 0 ? (
              <p className="loading">Loading contacts...</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMessages.map((msg) => (
                    <tr key={msg._id}>
                      <td>{msg.full_name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.createdAt?.substring(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#10256F" }}>
          <h2 className="card-title" style={{ color: "#ffffff" }}>
            Quick Actions
          </h2>
        </div>
        <div className="quick-actions">
          <Link to="/admin/add-product" className="action-btn">
            <span className="material-icons">add_circle</span> Add Product
          </Link>
          <Link to="/admin/banners" className="action-btn">
            <span className="material-icons">add_photo_alternate</span> Add
            Banner
          </Link>
          <Link to="/admin/products" className="action-btn">
            <span className="material-icons">inventory_2</span> Manage Products
          </Link>
          <Link to="/admin/contact" className="action-btn">
            <span className="material-icons">contact_mail</span> View Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
