import "./Dashboard.css";
import { Link } from "react-router-dom";


const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    { title: "Total Products", value: 124, icon: "inventory_2", color: "#0a2a8a" },
    { title: "Active Banners", value: 8, icon: "collections", color: "#ffc107" },
    { title: "Live Products", value: 98, icon: "visibility", color: "#28a745" },
    { title: "Contacts", value: 12, icon: "email", color: "#dc3545" },
  ]

  const recentProducts = [
    { id: 1, name: "Premium Bread", category: "Bread", status: "Active", date: "2023-06-01" },
    { id: 2, name: "Milk Rusk", category: "Rusk", status: "Active", date: "2023-05-28" },
    { id: 3, name: "Coconut Cookies", category: "Cookies", status: "Active", date: "2023-05-25" },
    { id: 4, name: "Brown Bread", category: "Bread", status: "Draft", date: "2023-05-20" },
  ]

  const recentMessages = [
    { id: 1, name: "John Doe", email: "john@example.com", subject: "Product Inquiry", date: "2023-06-02" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Feedback", date: "2023-06-01" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", subject: "Partnership", date: "2023-05-30" },
  ]

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              <span className="material-icons">{stat.icon}</span>
            </div>
            <div className="stat-info">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "#10256F" }}>
            <h2 className="card-title" style={{ color: "#ffffff" }}>Recent Products</h2>
            <button className="btn btn-primary">View All</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                      <span className={`status-badge ${product.status.toLowerCase()}`}>{product.status}</span>
                    </td>
                    <td>{product.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ backgroundColor: "#10256F" }}>
            <h2 className="card-title"style={{ color: "#ffffff" }}>Recent Contacts</h2>
            <button className="btn btn-primary">View All</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created On:</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
      <div className="card-header" style={{ backgroundColor: "#10256F" }}>
        <h2 className="card-title" style={{color: "#ffffff"}}>Quick Actions</h2>
      </div>
      <div className="quick-actions">
        <Link to="/admin/add-product" className="action-btn">
          <span className="material-icons">add_circle</span>
          Add Product
        </Link>

        <Link to="/admin/banners" className="action-btn">
          <span className="material-icons">add_photo_alternate</span>
          Add Banner
        </Link>

        <Link to="/admin/products" className="action-btn">
          <span className="material-icons">inventory_2</span>
          Manage Products
        </Link>

        <Link to="/admin/contact" className="action-btn">
          <span className="material-icons">contact_mail</span>
          View Contacts
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Dashboard;