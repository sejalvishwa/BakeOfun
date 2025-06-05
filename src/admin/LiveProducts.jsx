// File: components/LiveProducts.jsx
"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LiveProducts.css";

const LiveProducts = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Premium Bread",
      category: "Bread",
      price: 45.0,
      status: "Active",
      image: "/images/premium-bread.jpg",
      lastUpdated: "2023-06-03 10:30 AM",
      platforms: ["Swiggy", "Zomato"],
    },
    {
      id: 2,
      name: "Milk Rusk",
      category: "Rusk",
      price: 35.0,
      status: "Active",
      image: "/images/milk-rusk.jpg",
      lastUpdated: "2023-06-03 09:15 AM",
      platforms: ["Zomato"],
    },
    {
      id: 3,
      name: "Coconut Cookies",
      category: "Cookies",
      price: 50.0,
      status: "Active",
      image: "/images/coconut-cookies.jpg",
      lastUpdated: "2023-06-03 08:45 AM",
      platforms: ["Swiggy"],
    },
    {
      id: 4,
      name: "Brown Bread",
      category: "Bread",
      price: 40.0,
      status: "Active",
      image: "/images/brown-bread.jpg",
      lastUpdated: "2023-06-03 11:20 AM",
      platforms: [],
    },
    {
      id: 5,
      name: "Family Bread",
      category: "Bread",
      price: 60.0,
      status: "Active",
      image: "/images/family-bread.jpg",
      lastUpdated: "2023-06-03 07:30 AM",
      platforms: ["Swiggy", "Zomato"],
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    ...new Set(initialProducts.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || product.category === filterCategory) &&
      product.status === "Active"
    );
  });

  const totalProducts = products.filter(
    (product) => product.status === "Active"
  ).length;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const updatedProducts = products.map((product) => ({
        ...product,
        lastUpdated: new Date().toLocaleString(),
        platforms: product.platforms || [], // Explicitly keep platforms
      }));
      setProducts(updatedProducts);
      setRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!refreshing) {
        handleRefresh();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [refreshing]);

  // Debug: Log platforms to confirm data is present
  useEffect(() => {
    console.log("Products platforms:", products.map(p => ({ id: p.id, platforms: p.platforms })));
  }, [products]);

  return (
    <div className="live-products-container">
      <div className="live-products-header">
        <h1 className="page-title">Live Products</h1>
        <Link to="/admin/add-liveproducts" className="btn btn-primary">
          <span className="material-icons">add</span>Add Live Product
        </Link>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: "#17a2b8" }}>
            <span className="material-icons">inventory_2</span>
          </div>
          <div className="stat-info">
            <h3 className="stat-value">{totalProducts}</h3>
            <p className="stat-title">Live Products</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search live products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
            <span className="material-icons search-icon">search</span>
          </div>

          <div className="filter-options">
            <select
              className="form-control"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table live-products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Last Updated</th>
                <th>Platforms</th> {/* Added Platforms column */}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
  <div className="product-info-admin">
    <div className="product-image">
      <img
        src={
          product.image ||
          "/placeholder.svg?height=50&width=50"
        }
        alt={product.name}
      />
    </div>
    <div className="product-details">
      <span className="product-name">{product.name}</span>
      <span className="product-price">₹{product.price.toFixed(2)}</span>
    </div>
  </div>
</td>


                    <td>{product.category}</td>
                    <td>₹{product.price.toFixed(2)}</td>
                    <td>
                      <span className="last-updated">{product.lastUpdated}</span>
                    </td>
                    <td>
                      {product.platforms && product.platforms.length > 0 ? (
                        product.platforms.map((platform, i) => (
                          <span className="platform-tag" key={i}>
                            {platform}
                          </span>
                        ))
                      ) : (
                        <span className="platform-tag none">None</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-products">
                    No live products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveProducts;
