"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import { config } from "../config/config.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/products`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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

  const toggleProductSelection = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentIds = currentProducts.map((p) => p._id);
    const allSelected = currentIds.every((id) => selectedProducts.includes(id));

    if (allSelected) {
      setSelectedProducts((prev) =>
        prev.filter((id) => !currentIds.includes(id))
      );
    } else {
      const newSelection = Array.from(
        new Set([...selectedProducts, ...currentIds])
      );
      setSelectedProducts(newSelection);
    }
  };

  const handleDelete = async (id) => {
    // if (!/^[a-f\d]{24}$/i.test(id)) {
    //   alert("Invalid product ID: " + id);
    //   return;
    // }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${config.API_BASE_URL}/api/products/${id}`
      );
      console.log("Delete successful:", response.data);

      setProducts((prev) => prev.filter((p) => p._id !== id));
      setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product. Check console for details.");
    }
  };

  const handleBulkDelete = async () => {
    if (
      selectedProducts.length > 0 &&
      window.confirm(`Delete ${selectedProducts.length} selected products?`)
    ) {
      try {
        await Promise.all(
          selectedProducts.map((id) =>
            axios.delete(`${config.API_BASE_URL}/api/products/${id}`)
          )
        );
        setProducts((prev) =>
          prev.filter((p) => !selectedProducts.includes(p._id))
        );
        setSelectedProducts([]);
      } catch (err) {
        console.error("Bulk delete failed:", err);
        alert("Failed to delete some products. See console.");
      }
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

        {selectedProducts.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedProducts.length} selected</span>
            <button className="btn btn-danger" onClick={handleBulkDelete}>
              <span className="material-icons">delete</span> Delete Selected
            </button>
          </div>
        )}

        <div className="table-container">
          <table className="table products-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      currentProducts.length > 0 &&
                      currentProducts.every((p) =>
                        selectedProducts.includes(p._id)
                      )
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
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
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(p._id)}
                        onChange={() => toggleProductSelection(p._id)}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.categoryTitle || p.category}</td>
                    <td>₹{p.price.toFixed(2)}</td>
                    <td>
                      <img
                        src={
                          Array.isArray(p.images) && p.images[0]
                            ? config.IMAGE_BASE_URL + p.images[0]
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
                          to={`/admin/edit-product/${p._id}`}
                          className="action-btn edit"
                        >
                          <span className="material-icons">edit</span>
                        </Link>
                        <button
                          className="action-btn delete"
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
                  <td colSpan="7" className="no-products">
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
