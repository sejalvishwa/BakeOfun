"use client";

import { useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "../assets/images/about-logo-2.png";

const Login = ({ user, onLogin, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: username,
        password: password,
      });

      console.log("Login success:", response.data);
      onLogin({ username, role: "Administrator" });
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  // If user is logged in, show Logout button and welcome message
  if (user) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <img src={logo || "/placeholder.svg"} alt="BakeOFun Logo" className="login-logo" />
            <h1>Admin Panel</h1>
          </div>

          <div className="welcome-message">
            <h2>Welcome, {user.username}!</h2>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>

          <div className="login-footer">
            <p>BakeOFun Admin Panel © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise show login form
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
  );
};

export default Login;
