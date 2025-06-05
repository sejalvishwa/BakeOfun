"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import "./App.css"

// Components
import Login from "./Login"
import Dashboard from "./Dashboard"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Products from "./Products"
import AddProduct from "./AddProduct"
import Banners from "./Banners"
import LiveProducts from "./LiveProducts"
import Contact from "./Contact"
import AddLiveProducts from "./AddLiveProducts"

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a2a8a',
    },
    secondary: {
      main: '#ffc107',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()

  // Check if user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  // If not authenticated and not on login page, redirect to login
  if (!isAuthenticated && !location.pathname.includes('/login')) {
    return <Navigate to="login" replace />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app">
        {isAuthenticated ? (
          <Box className="app-container">
            <Sidebar />
            <Box className="main-content">
              <Header user={user} onLogout={handleLogout} />
              <Box className="content">
                <Routes>
                  <Route path="" element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="add-product" element={<AddProduct />} />
                  <Route path="banners" element={<Banners />} />
                  <Route path="live-products" element={<LiveProducts />} />
                  <Route path="add-liveproducts" element={<AddLiveProducts />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="" replace />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        ) : (
          <Routes>
            <Route path="login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="login" replace />} />
          </Routes>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App 