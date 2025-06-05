"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Products.css"

const Products = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Premium Bread",
      category: "Bread",
      price: 45.0,
      stock: 120,
      status: "Active",
      image: "/images/premium-bread.jpg",
      platforms: ["Swiggy", "Zomato"],
    },
    {
      id: 2,
      name: "Milk Rusk",
      category: "Rusk",
      price: 35.0,
      status: "Active",
      image: "/images/milk-rusk.jpg",
      platforms: ["Zomato"],
    },
    {
      id: 3,
      name: "Coconut Cookies",
      category: "Cookies",
      price: 50.0,
      status: "Active",
      image: "/images/coconut-cookies.jpg",
      platforms: ["Swiggy"],
    },
    {
      id: 4,
      name: "Brown Bread",
      category: "Bread",
      price: 40.0,
      status: "Active",
      image: "/images/brown-bread.jpg",
      platforms: ["Swiggy", "Zomato"],
    },
    {
      id: 5,
      name: "Multi Grain Bread",
      category: "Bread",
      price: 55.0,
      status: "Active",
      image: "/images/multi-grain-bread.jpg",
      platforms: [],
    },
    {
      id: 6,
      name: "Paw Bread",
      category: "Bread",
      price: 48.0,
      status: "Draft",
      image: "/images/paw-bread.jpg",
      platforms: ["Swiggy"],
    },
    {
      id: 7,
      name: "Family Bread",
      category: "Bread",
      price: 60.0,
      status: "Active",
      image: "/images/family-bread.jpg",
      platforms: ["Zomato"],
    },
  ]

  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProducts, setSelectedProducts] = useState([])

  const productsPerPage = 5
  const categories = [...new Set(initialProducts.map((p) => p.category))]

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === "" || p.category === filterCategory) &&
    (filterStatus === "" || p.status === filterStatus)
  )

  const indexOfLast = currentPage * productsPerPage
  const indexOfFirst = indexOfLast - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const toggleProductSelection = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === currentProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(currentProducts.map((p) => p.id))
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id))
    }
  }

  const handleBulkDelete = () => {
    if (
      selectedProducts.length > 0 &&
      window.confirm(`Delete ${selectedProducts.length} selected products?`)
    ) {
      setProducts(products.filter((p) => !selectedProducts.includes(p.id)))
      setSelectedProducts([])
    }
  }

  const handleStatusChange = (id, newStatus) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="page-title">Products</h1>
        <Link to="/admin/add-product" className="btn btn-primary">
          <span className="material-icons">add</span> Add Product
        </Link>
      </div>

      <div className="card">
        {/* Filters */}
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
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedProducts.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedProducts.length} selected</span>
            <button className="btn btn-danger" onClick={handleBulkDelete}>
              <span className="material-icons">delete</span> Delete Selected
            </button>
          </div>
        )}

        {/* Table */}
        <div className="table-container">
          <table className="table products-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Image</th>
                <th>Delivery Platforms</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(p.id)}
                        onChange={() => toggleProductSelection(p.id)}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price.toFixed(2)}</td>
                    <td>
                      <select
                        value={p.status}
                        className={`status-select ${p.status.toLowerCase()}`}
                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td>
                      <img
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        style={{ width: "60px", borderRadius: "8px" }}
                      />
                    </td>
                    <td>
                      {p.platforms.length > 0 ? (
                        p.platforms.map((platform, i) => (
                          <span key={i} className="platform-badge">
                            {platform}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit">
                          <span className="material-icons">edit</span>
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(p.id)}>
                          <span className="material-icons">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-products">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
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
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
