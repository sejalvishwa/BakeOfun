"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AddLiveProducts.css"

const AddLiveProducts = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    deliveryPlatforms: [
      { name: "", link: "", logo: null, logoPreview: "" },
    ],
  })

  const [errors, setErrors] = useState({})
  const [previewImage, setPreviewImage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = ["Bread", "Rusk", "Cookies", "Cakes", "Pastries", "Others"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: "" })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPreviewImage(reader.result)
    reader.readAsDataURL(file)
    setFormData({ ...formData, image: file })
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
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = "Valid price required"
    if (!formData.image) newErrors.image = "Product image is required"

    formData.deliveryPlatforms.forEach((platform, index) => {
      if (!platform.name.trim() || !platform.link.trim() || !platform.logo)
        newErrors[`platform-${index}`] = "All delivery platform fields are required"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setTimeout(() => {
      console.log("Live product submitted:", formData)
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        navigate("/add-liveproducts")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h1 className="page-title">Add Live Product</h1>
        <button className="btn btn-secondary" onClick={() => navigate("/admin/live-products")}>Back to Liveproducts</button>
      </div>

      {showSuccess && <div className="alert alert-success">Live product added successfully!</div>}

      <div className="card">
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={`form-control ${errors.name ? "error" : ""}`} />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} className={`form-control ${errors.category ? "error" : ""}`}>
                  <option value="">Select Category</option>
                  {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>
                {errors.category && <div className="error-message">{errors.category}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className={`form-control ${errors.price ? "error" : ""}`} min="0" />
                {errors.price && <div className="error-message">{errors.price}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Product Image *</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className={`form-control ${errors.image ? "error" : ""}`} />
                {errors.image && <div className="error-message">{errors.image}</div>}
                {previewImage && <img src={previewImage} alt="Product Preview" className="preview-image" />}
              </div>
            </div>

            <div className="form-column">
              <label className="form-label">Delivery Platforms *</label>
              {formData.deliveryPlatforms.map((platform, index) => (
                <div key={index} className="platform-group">
                  <input type="text" placeholder="Platform Name" value={platform.name} onChange={(e) => handlePlatformChange(index, "name", e.target.value)} className="form-control" />
                  <input type="url" placeholder="Platform Link" value={platform.link} onChange={(e) => handlePlatformChange(index, "link", e.target.value)} className="form-control" />
                  <input type="file" accept="image/*" onChange={(e) => handleLogoUpload(index, e.target.files[0])} className="form-control" />
                  {platform.logoPreview && <img src={platform.logoPreview} alt="Logo Preview" className="preview-logo" />}
                  {errors[`platform-${index}`] && <div className="error-message">{errors[`platform-${index}`]}</div>}
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removePlatform(index)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary btn-sm" onClick={addPlatform}>Add Platform</button>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/live-products")}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Live Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLiveProducts;
