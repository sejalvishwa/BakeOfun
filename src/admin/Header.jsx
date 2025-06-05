"use client"

import { useState } from "react"
import "./Header.css"

const Header = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleLogout = () => {
    onLogout()
  }

  return (
    <header className="header">
      <div className="header-title">
        <h1>BakeOFun Admin Panel</h1>
      </div>

      <div className="header-actions">
        {/* <div className="header-search">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-btn">
            <span className="material-icons">search</span>
          </button>
        </div> */}

        {/* <div className="header-notifications">
          <button className="notification-btn">
            <span className="material-icons">notifications</span>
            <span className="notification-badge">3</span>
          </button>
        </div> */}

        <div className="header-user">
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-avatar">
              <span className="material-icons">account_circle</span>
            </div>
            <div className="user-name">
              {user?.username || "Admin"}
              <span className="material-icons">arrow_drop_down</span>
            </div>
          </div>

          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <strong>{user?.username || "Admin"}</strong>
                <span>{user?.role || "Administrator"}</span>
              </div>
              <ul className="dropdown-menu">
                {/* <li>
                  <a href="#profile">
                    <span className="material-icons">person</span>
                    Profile
                  </a>
                </li> */}
                {/* <li>
                  <a href="#settings">
                    <span className="material-icons">settings</span>
                    Settings
                  </a>
                </li> */}
                <li className="divider"></li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    <span className="material-icons">exit_to_app</span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
