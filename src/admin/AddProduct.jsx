"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AddProduct.css"

const AddProduct = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "Active",
    featured: false,
    images: [],
    deliveryPlatforms: [{ name: "", link: "", logo: null, logoPreview: "" }],
  })

  const [errors, setErrors] = useState({})
  const [previewImages, setPreviewImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = ["Bread", "Rusk", "Cookies", "Cakes", "Pastries", "Others"]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value })
    if (errors[name]) setErrors({ ...errors, [name]: "" })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const newPreviewImages = [...previewImages]
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviewImages.push(e.target.result)
        setPreviewImages([...newPreviewImages])
      }
      reader.readAsDataURL(file)
    })

    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    })
  }

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages]
    newPreviewImages.splice(index, 1)
    setPreviewImages(newPreviewImages)

    const newImages = [...formData.images]
    newImages.splice(index, 1)
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  const handlePlatformChange = (index, field, value) => {
    const updated = [...formData.deliveryPlatforms]
    updated[index][field] = value
    setFormData({ ...formData, deliveryPlatforms: updated })
  }

  const handleLogoUpload = (index, file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const updated = [...formData.deliveryPlatforms]
      updated[index].logo = file
      updated[index].logoPreview = reader.result
      setFormData({ ...formData, deliveryPlatforms: updated })
    }
    reader.readAsDataURL(file)
  }

  const addPlatform = () => {
    setFormData({
      ...formData,
      deliveryPlatforms: [...formData.deliveryPlatforms, { name: "", link: "", logo: null, logoPreview: "" }],
    })
  }

  const removePlatform = (index) => {
    const updated = [...formData.deliveryPlatforms]
    updated.splice(index, 1)
    setFormData({ ...formData, deliveryPlatforms: updated })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (formData.images.length === 0) newErrors.images = "At least one image is required"

    formData.deliveryPlatforms.forEach((platform, index) => {
      if (!platform.name.trim() || !platform.link.trim() || !platform.logo) {
        newErrors[`platform-${index}`] = "All delivery platform fields are required"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setTimeout(() => {
      console.log("Product submitted:", formData)
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        navigate("/products")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h1 className="page-title">Add New Product</h1>
        <button className="btn btn-secondary" onClick={() => navigate("/admin/products")}>
          <span className="material-icons">arrow_back</span> Back to Products
        </button>
      </div>

      {showSuccess && <div className="alert alert-success">Product has been added successfully!</div>}

      <div className="card">
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? "error" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">Category *</label>
                <select
                  id="category"
                  name="category"
                  className={`form-control ${errors.category ? "error" : ""}`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <div className="error-message">{errors.category}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Product Images *</label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="form-control"
                />
                {errors.images && <div className="error-message">{errors.images}</div>}
                {previewImages.length > 0 && (
                  <div className="image-preview-container">
                    {previewImages.map((img, i) => (
                      <div key={i} className="image-preview-item">
                        <img src={img} alt={`Preview ${i}`} />
                        <button type="button" className="image-remove-btn" onClick={() => removeImage(i)}>
                          <span className="material-icons">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Delivery Platforms *</label>
                {formData.deliveryPlatforms.map((platform, index) => (
                  <div key={index} className="platform-group">
                    <input
                      type="text"
                      placeholder="Platform Name"
                      value={platform.name}
                      onChange={(e) => handlePlatformChange(index, "name", e.target.value)}
                      className="form-control"
                    />
                    <input
                      type="url"
                      placeholder="Platform Link"
                      value={platform.link}
                      onChange={(e) => handlePlatformChange(index, "link", e.target.value)}
                      className="form-control"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLogoUpload(index, e.target.files[0])}
                      className="form-control"
                    />
                    {platform.logoPreview && (
                      <img src={platform.logoPreview} alt="Logo Preview" className="preview-logo" />
                    )}
                    {errors[`platform-${index}`] && (
                      <div className="error-message">{errors[`platform-${index}`]}</div>
                    )}
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removePlatform(index)}>Remove</button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary btn-sm" onClick={addPlatform}>Add Platform</button>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/products")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
