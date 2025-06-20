"use client";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddNews = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const news_id = searchParams.get("news_id");

  const [formData, setFormData] = useState({
    title: "",
    images: [],
    imagePreviews: [],
    existingImages: [],
    publishedBy: "",
    description: "",
    publishedDate: "",
    section: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (news_id) {
      axios
        .get(`http://localhost:5000/api/news/${news_id}`)
        .then((response) => {
          const news = response.data.data;
          setFormData((prev) => ({
            ...prev,
            title: news.title || "",
            images: [],
            existingImages: news.images || [],
            imagePreviews: [],
            publishedBy: news.publishedBy || "",
            description: news.description || "",
            publishedDate: news.publishedDate
              ? news.publishedDate.split("T")[0]
              : "",
            section: news.section || "",
          }));
        })
        .catch((err) => {
          console.error("Error fetching news:", err);
          alert("Failed to fetch news data.");
        });
    }
  }, [news_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews],
    }));
  };

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      setFormData((prev) => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
        imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSectionChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      section: e.target.value,
    }));
    if (errors.section) setErrors({ ...errors, section: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.publishedBy.trim())
      newErrors.publishedBy = "Published by is required";
    if (!formData.publishedDate)
      newErrors.publishedDate = "Published date is required";
    if (
      formData.images.length === 0 &&
      formData.existingImages.length === 0
    )
      newErrors.image = "At least one news image is required";
    if (!formData.section)
      newErrors.section = "Please select a section";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("publishedBy", formData.publishedBy.trim());
      data.append("publishedDate", formData.publishedDate);
      data.append("section", formData.section);

      // ✅ Set isFeatured based on radio selection
      data.append("isFeatured", formData.section === "featured");

      formData.images.forEach((file) => {
        data.append("images", file);
      });

      formData.existingImages.forEach((img) => {
        data.append("existingImages[]", img);
      });

      const url = news_id
        ? `http://localhost:5000/api/news/${news_id}`
        : "http://localhost:5000/api/news";
      const method = news_id ? "put" : "post";

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
          navigate("/admin/news");
        }, 2000);
      } else {
        alert("Failed to save news.");
      }
    } catch (error) {
      console.error("Error submitting news:", error);
      alert("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h1 className="page-title">{news_id ? "Edit News" : "Add News"}</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/news")}
        >
          Back to News
        </button>
      </div>

      {showSuccess && (
        <div className="alert alert-success">News saved successfully!</div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-control ${errors.title ? "error" : ""}`}
            />
            {errors.title && (
              <div className="error-message">{errors.title}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Images *</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className={`form-control ${errors.image ? "error" : ""}`}
            />
            {errors.image && (
              <div className="error-message">{errors.image}</div>
            )}
            <div className="preview-multiple">
              {formData.existingImages.map((src, idx) => (
                <div key={`existing-${idx}`} className="preview-box">
                  <img
                    src={src}
                    alt={`Existing ${idx + 1}`}
                    className="preview-image"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx, true)}
                    className="remove-btn"
                  >
                    ✖
                  </button>
                </div>
              ))}
              {formData.imagePreviews.map((src, idx) => (
                <div key={`new-${idx}`} className="preview-box">
                  <img
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="preview-image"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx, false)}
                    className="remove-btn"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Published By *</label>
            <input
              type="text"
              name="publishedBy"
              value={formData.publishedBy}
              onChange={handleChange}
              className={`form-control ${errors.publishedBy ? "error" : ""}`}
            />
            {errors.publishedBy && (
              <div className="error-message">{errors.publishedBy}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <div className={`form-control ${errors.description ? "error" : ""}`}>
              <ReactQuill
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                theme="snow"
              />
            </div>
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Published Date *</label>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              className={`form-control ${errors.publishedDate ? "error" : ""}`}
            />
            {errors.publishedDate && (
              <div className="error-message">{errors.publishedDate}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Show in Section *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="section"
                  value="featured"
                  checked={formData.section === "featured"}
                  onChange={handleSectionChange}
                />
                Featured Story
              </label>
              <label>
                <input
                  type="radio"
                  name="section"
                  value="latest"
                  checked={formData.section === "latest"}
                  onChange={handleSectionChange}
                />
                Latest News
              </label>
            </div>
            {errors.section && (
              <div className="error-message">{errors.section}</div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/news")}
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
                : news_id
                ? "Update News"
                : "Save News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
