"use client"

import { useState } from "react"
import "./Banners.css"

const Banners = () => {
  const initialBanners = [
    {
      id: 1,
      image: "/images/banner1.jpg",
      order: 1,
    },
    {
      id: 2,
      image: "/images/banner2.jpg",
      order: 2,
    },
    {
      id: 3,
      image: "/images/banner3.jpg",
      order: 3,
    },
  ]

  const [banners, setBanners] = useState(initialBanners)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBanner, setEditingBanner] = useState(null)
  const [formData, setFormData] = useState({
    image: null,
    order: 1,
  })

  const [previewImage, setPreviewImage] = useState("")
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })

      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!editingBanner && !formData.image) newErrors.image = "Image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (editingBanner) {
      setBanners(
        banners.map((banner) =>
          banner.id === editingBanner.id
            ? {
                ...banner,
                ...formData,
                image: formData.image ? previewImage : banner.image,
              }
            : banner
        )
      )
    } else {
      const newBanner = {
        id: Date.now(),
        ...formData,
        image: previewImage,
      }
      setBanners([...banners, newBanner])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      image: null,
      order: 1,
    })
    setPreviewImage("")
    setErrors({})
    setShowAddForm(false)
    setEditingBanner(null)
  }

  const handleEdit = (banner) => {
    setEditingBanner(banner)
    setFormData({
      image: null,
      order: banner.order,
    })
    setPreviewImage(banner.image)
    setShowAddForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter((b) => b.id !== id))
    }
  }

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
                  <label htmlFor="order" className="form-label">Display Order</label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    className="form-control"
                    value={formData.order}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">Banner Image *</label>
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
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
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
              <div key={banner.id} className="banner-card">
                <div className="banner-image">
                  <img src={banner.image || "/placeholder.svg"} alt="Banner" />
                  <div className="banner-overlay">
                    <button className="action-btn edit" onClick={() => handleEdit(banner)}>
                      <span className="material-icons">edit</span>
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(banner.id)}>
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                </div>
                <div className="banner-info">
                  <div className="banner-details">
                    <span>Order: {banner.order}</span>
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
  )
}

export default Banners
