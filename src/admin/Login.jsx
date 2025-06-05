"use client"

import { useState } from "react"
import "./Login.css"
import logo from "../assets/images/about-logo-2.png";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!username || !password) {
      setError("Please enter both username and password")
      setLoading(false)
      return
    }

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        onLogin({ username, role: "Administrator" })
      } else {
        setError("Invalid username or password")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <img src={logo || "/placeholder.svg"} alt="BakeOFun Logo" className="login-logo" />
          <h1>Admin Panel</h1>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>BakeOFun Admin Panel © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}

export default Login
