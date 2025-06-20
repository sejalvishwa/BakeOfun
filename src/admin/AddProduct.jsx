"use client";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const product_id = searchParams.get("product_id");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    categoryTitle: "",
    description: "",
    price: "",
    stock: "",
    isFeatured: false,
    image: null,
    deliveryPlatforms: [{ name: "", link: "", logo: null, logoPreview: "" }],
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ["Bread", "Rusk", "Cookies", "Cakes", "Pastries", "Others"];

  useEffect(() => {
    if (product_id) {
      axios
        .get(`http://localhost:5000/api/products/${product_id}`)
        .then((response) => {
          const product = response.data.data;

          setFormData({
            name: product.name || "",
            category: product.category || "",
            categoryTitle: product.categoryTitle || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
            isFeatured: product.isFeatured || false,
            image: null,
            deliveryPlatforms: product.deliveryPlatforms.map((platform) => ({
              name: platform.name || "",
              link: platform.link || "",
              logo: null,
              logoPreview: `${platform.logo}` || "",
            })),
          });

          setPreviewImage(
            product.images?.[0] ? `${product.images[0]}` : ""
          );
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          alert("Failed to fetch product data.");
        });
    }
  }, [product_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
    setFormData({ ...formData, image: file });
  };

  const handlePlatformChange = (index, field, value) => {
    const updated = [...formData.deliveryPlatforms];
    updated[index][field] = value;
    setFormData({ ...formData, deliveryPlatforms: updated });
  };

  const handleLogoUpload = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updated = [...formData.deliveryPlatforms];
      updated[index].logo = file;
      updated[index].logoPreview = reader.result;
      setFormData({ ...formData, deliveryPlatforms: updated });
    };
    reader.readAsDataURL(file);
  };

  const addPlatform = () => {
    setFormData({
      ...formData,
      deliveryPlatforms: [
        ...formData.deliveryPlatforms,
        { name: "", link: "", logo: null, logoPreview: "" },
      ],
    });
  };

  const removePlatform = (index) => {
    const updated = [...formData.deliveryPlatforms];
    updated.splice(index, 1);
    setFormData({ ...formData, deliveryPlatforms: updated });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.categoryTitle.trim())
      newErrors.categoryTitle = "Category title is required";
    if (!formData.description.trim())
      newErrors.description = "Product description is required";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Valid price required";
    if (!formData.image && !previewImage)
      newErrors.image = "Product image is required";

    formData.deliveryPlatforms.forEach((platform, index) => {
      if (
        !platform.name.trim() ||
        !platform.link.trim() ||
        (!platform.logo && !platform.logoPreview)
      )
        newErrors[`platform-${index}`] =
          "All delivery platform fields are required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name.trim());
      data.append("price", formData.price);
      data.append("description", formData.description.trim());
      data.append("category", formData.category.toLowerCase());
      data.append("stock", formData.stock);
      data.append("isFeatured", formData.isFeatured);

      if (formData.image) {
        data.append("images", formData.image);
      }

      const platformData = formData.deliveryPlatforms.map((platform, index) => {
        const logoFilename = platform.logo
          ? `platform-logo-${index}.${platform.logo.name.split(".").pop()}`
          : platform.logoPreview?.split("/").pop() || "";

        return {
          name: platform.name,
          link: platform.link,
          logo: logoFilename,
        };
      });

      data.append("deliveryPlatforms", JSON.stringify(platformData));

      formData.deliveryPlatforms.forEach((platform, index) => {
        if (platform.logo) {
          data.append(
            "platformLogos",
            platform.logo,
            `platform-logo-${index}.${platform.logo.name.split(".").pop()}`
          );
        }
      });

      const url = product_id
        ? `http://localhost:5000/api/products/${product_id}`
        : "http://localhost:5000/api/products";

      const method = product_id ? "put" : "post";

      const response = await axios({
        method,
        url,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/admin/products");
        }, 2000);
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Error submitting product");
    } finally { 
      setIsSubmitting(false);
    }
  };
  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h1 className="page-title">
          {product_id ? "Edit Product" : "Add Product"}
        </h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/products")}
        >
          Back to Products
        </button>
      </div>

      {showSuccess && (
        <div className="alert alert-success">Product saved successfully!</div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-grid">
            <div className="form-column">
              {/* Name */}
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? "error" : ""}`}
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`form-control ${errors.category ? "error" : ""}`}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="error-message">{errors.category}</div>
                )}
              </div>

              {/* Category Title */}
              <div className="form-group">
                <label className="form-label">Category Title *</label>
                <input
                  type="text"
                  name="categoryTitle"
                  value={formData.categoryTitle}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.categoryTitle ? "error" : ""
                  }`}
                />
                {errors.categoryTitle && (
                  <div className="error-message">{errors.categoryTitle}</div>
                )}
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Product Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.description ? "error" : ""
                  }`}
                  rows={4}
                />
                {errors.description && (
                  <div className="error-message">{errors.description}</div>
                )}
              </div>

              {/* Price */}
              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`form-control ${errors.price ? "error" : ""}`}
                  min="0"
                />
                {errors.price && (
                  <div className="error-message">{errors.price}</div>
                )}
              </div>

              {/* Product Image */}
              <div className="form-group">
                <label className="form-label">Product Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={`form-control ${errors.image ? "error" : ""}`}
                />
                {errors.image && (
                  <div className="error-message">{errors.image}</div>
                )}
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Product Preview"
                    className="preview-image"
                  />
                )}
              </div>
            </div>

            {/* Delivery Platforms */}
            <div className="form-column">
              <label className="form-label">Delivery Platforms *</label>
              {formData.deliveryPlatforms.map((platform, index) => (
                <div key={index} className="platform-group">
                  <input
                    type="text"
                    placeholder="Platform Name"
                    value={platform.name}
                    onChange={(e) =>
                      handlePlatformChange(index, "name", e.target.value)
                    }
                    className="form-control"
                  />
                  <input
                    type="url"
                    placeholder="Platform Link"
                    value={platform.link}
                    onChange={(e) =>
                      handlePlatformChange(index, "link", e.target.value)
                    }
                    className="form-control"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(index, e.target.files[0])}
                    className="form-control"
                  />
                  {platform.logoPreview && (
                    <img
                      src={platform.logoPreview}
                      alt="Logo Preview"
                      className="preview-logo"
                    />
                  )}
                  {errors[`platform-${index}`] && (
                    <div className="error-message">
                      {errors[`platform-${index}`]}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removePlatform(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={addPlatform}
              >
                Add Platform
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : product_id
                ? "Update Product"
                : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
