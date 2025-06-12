"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./Banners.css";

const API_URL = "http://localhost:5000";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    image: null, 
    order: 1, 
  });
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch banners list from backend
  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/banners`);
      setBanners(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image file selection and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Validate form before submit
  const validateForm = () => {
    const newErrors = {};

    // Image required if adding new banner
    if (!editingBanner && !formData.image) {
      newErrors.image = "Image is required";
    }

    // Check if order number already exists (exclude current editing banner)
    const orderExists = banners.some((banner) => {
      const bannerOrder = banner.order_number || banner.order;
      return (
        Number(bannerOrder) === Number(formData.order) &&
        (editingBanner
          ? (banner.id || banner._id) !== (editingBanner.id || editingBanner._id)
          : true)
      );
    });

    if (orderExists) {
      newErrors.order = "Display order number already exists. Please choose a different number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler (for add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append("order_number", formData.order);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      let response;
      if (editingBanner) {
        // PUT request for updating banner
        response = await axios.put(
          `${API_URL}/api/banners/${editingBanner.id || editingBanner._id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // POST request for creating new banner
        response = await axios.post(`${API_URL}/api/banners`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.data.success) {
        fetchBanners();
        resetForm();
      } else {
        console.error("API responded with error:", response.data);
      }
    } catch (error) {
      console.error("Error saving banner:", error);
    }
  };

  // Reset form and states
  const resetForm = () => {
    setFormData({ image: null, order: 1 });
    setPreviewImage("");
    setErrors({});
    setShowAddForm(false);
    setEditingBanner(null);
  };

  // Start editing a banner: load data into form
  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      image: null, // start with null, image optional on update
      order: banner.order_number || banner.order || 1,
    });
    setPreviewImage(`${API_URL}${banner.image}`);
    setShowAddForm(true);
  };

  // Delete banner UI update (optional: add axios.delete call here)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setBanners((prev) => prev.filter((b) => b.id !== id && b._id !== id));
      // Optional: axios.delete(`${API_URL}/api/banners/${id}`)
    }
  };

  return (
    <div className="banners-container">
      <div className="banners-header">
        <h1 className="page-title">Banner Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
          <span className="material-icons">add</span> Add Banner
        </button>
      </div>

      {showAddForm && (
        <div className="card banner-form-card">
          <div className="card-header">
            <h2 className="card-title">{editingBanner ? "Edit Banner" : "Add New Banner"}</h2>
            <button className="btn btn-secondary" onClick={resetForm}>
              <span className="material-icons">close</span> Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="banner-form">
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="order" className="form-label">
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    className={`form-control ${errors.order ? "input-error" : ""}`}
                    value={formData.order}
                    onChange={handleChange}
                    min="1"
                  />
                  {errors.order && <div className="error-message">{errors.order}</div>}
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">
                    Banner Image {editingBanner ? "(leave empty to keep current)" : "*"}
                  </label>
                  <div className={`image-upload-container ${errors.image ? "error" : ""}`}>
                    <div className="image-upload-area">
                      <input
                        type="file"
                        id="bannerImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="image-upload-input"
                      />
                      <div className="image-upload-content">
                        <span className="material-icons">cloud_upload</span>
                        <p>Click to upload banner image</p>
                        <span className="image-upload-hint">Recommended size: 1920x600px</span>
                      </div>
                    </div>
                    {errors.image && <div className="error-message">{errors.image}</div>}
                  </div>

                  {previewImage && (
                    <div className="banner-preview">
                      <img src={previewImage} alt="Banner Preview" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingBanner ? "Update Banner" : "Save Banner"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">All Banners</h2>
        </div>

        <div className="banners-grid">
          {banners.length > 0 ? (
            banners.map((banner) => (
              <div key={banner.id || banner._id} className="banner-card">
                <div className="banner-image">
                  <img
                    src={banner.image ? `${API_URL}${banner.image}` : "/placeholder.svg"}
                    alt="Banner"
                  />
                  <div className="banner-overlay">
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(banner)}
                    >
                      <span className="material-icons">edit</span>
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(banner.id || banner._id)}
                    >
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                </div>
                <div className="banner-info">
                  <div className="banner-details">
                    <span>Order: {banner.order_number || banner.order}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-banners">No banners available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banners;
