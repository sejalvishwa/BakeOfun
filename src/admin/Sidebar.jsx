"use client"

import { useState } from "react"

import { Link, useLocation } from "react-router-dom"
import "./Sidebar.css"
import logo from "../assets/images/about-logo.jpg";

function Sidebar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const menuItems = [
        { path: "/admin/", label: "Dashboard", icon: "dashboard" },
        { path: "/admin/products", label: "Products", icon: "inventory" },
        { path: "/admin/add-product", label: "Add Product", icon: "add_circle" },
        { path: "/admin/banners", label: "Banners", icon: "collections" },
        { path: "/admin/live-products", label: "Live Products", icon: "visibility" },
        { path: "/admin/add-liveproducts", label: "Add Live Products", icon: "add_circle" },
        { path: "/admin/contact", label: "Contact", icon: "contact_mail" },
        { path: "/admin/news", label: "News", icon: "mail" },
        { path: "/admin/add-news", label: "Add News", icon: "add_circle" },
    ];

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                <img src={logo || "/placeholder.svg"} alt="BakeOFun Logo" className="sidebar-logo" />
                {/* <h2 className="sidebar-title">BakeOFun</h2> */}
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <span className="material-icons">{collapsed ? "menu_open" : "menu"}</span>
                </button>
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}
                    >
                        <span className="material-icons">{item.icon}</span>
                        <span className="sidebar-label">{item.label}</span>
                    </Link>
                ))}
            </div>

            <div className="sidebar-footer">
                <p>Admin Panel v1.0</p>
            </div>
        </div>
    );
}

export default Sidebar