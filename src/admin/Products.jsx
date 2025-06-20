"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import { config } from "../config/config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/products`);
        setProducts(response.data.data);
        setLoading(false);
        // toast.success("Products loaded successfully"); // Removed as requested
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || p.category === filterCategory)
  );

  const categories = [...new Set(products.map((p) => p.category))];

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${config.API_BASE_URL}/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete product!");
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;

  if (error)
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  return (
    <div className="products-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="products-header">
        <h1 className="page-title">Products</h1>
        <Link to="/admin/add-product" className="btn btn-primary">
          <span className="material-icons">add</span> Add Product
        </Link>
      </div>

      <div className="card">
        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
            <span className="material-icons search-icon">search</span>
          </div>

          <div className="filter-options">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Image</th>
                <th>Delivery Platforms</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.categoryTitle || p.category}</td>
                    <td>₹{p.price.toFixed(2)}</td>
                    <td>
                      <img
                        src={
                          Array.isArray(p.images) && p.images[0]
                            ?  p.images[0]
                            : "/placeholder.svg"
                        }
                        alt={p.name}
                        style={{ width: "60px", borderRadius: "8px" }}
                      />
                    </td>
                    <td>
                      {p.deliveryPlatforms?.length > 0 ? (
                        p.deliveryPlatforms.map((platform, i) => (
                          <span key={i} className="platform-badge">
                            {platform?.name || platform}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/add-product/?product_id=${p._id}`}
                          className="action-icon edit"
                        >
                          <span className="material-icons">edit</span>
                        </Link>
                        <button
                          className="action-icon delete"
                          onClick={() => handleDelete(p._id)}
                        >
                          <span className="material-icons">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-products">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <span className="material-icons">chevron_left</span>
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
