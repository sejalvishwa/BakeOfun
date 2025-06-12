"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LiveProducts.css";
import { config } from "../config/config.js";

const LiveProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || product.category === filterCategory) &&
      product.isActive === true
    );
  });

  const totalProducts = products.filter((product) => product.isActive).length;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const updatedProducts = products.map((product) => ({
        ...product,
        updatedAt: new Date().toLocaleString(),
        deliveryPlatforms: product.deliveryPlatforms || [],
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
  }, [refreshing, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}/api/live-products`
        );
        const productData = response.data.data;
        const dataArray = Array.isArray(productData)
          ? productData
          : [productData];
        setProducts(dataArray);
        console.log("Fetched Products:", dataArray);
      } catch (error) {
        console.error("Error fetching live products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

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
                <th>Platforms</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id || product.id}>
                    <td>
                      <div className="product-info-admin">
                        <div className="product-image">
                          <img
                            src={
                              product.images && product.images.length > 0
                                ? `${config.IMAGE_BASE_URL}${product.images[0]}`
                                : "/placeholder.svg"
                            }
                            alt={product.name}
                            style={{
                              height: "50px",
                              width: "50px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="product-details">
                          <span className="product-name">{product.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>₹{product.price.toFixed(2)}</td>
                    <td>
                      <span className="last-updated">
                        {new Date(
                          product.updatedAt || product.createdAt
                        ).toLocaleString()}
                      </span>
                    </td>
                    <td>
                      {product.deliveryPlatforms &&
                      product.deliveryPlatforms.length > 0 ? (
                        product.deliveryPlatforms.map((platform, i) => (
                          <a
                            href={platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={i}
                            className="platform-tag"
                            style={{
                              marginRight: "6px",
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={`${config.IMAGE_BASE_URL}${platform.logo}`}
                              alt={platform.name}
                              style={{ height: "20px", marginRight: "4px" }}
                            />
                            {platform.name}
                          </a>
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
