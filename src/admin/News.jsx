"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css"; 

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/news");
        const sortedNews = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewsData(sortedNews);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setError("Failed to fetch news data");
      }
    };

    fetchNews();
  }, []);

  const filteredNews = newsData.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.publishedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="banners-container">
      <div className="banners-header">
        <h1 className="page-title">News</h1>
      </div>

      <div className="contact-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error ? (
          <p className="error">{error}</p>
        ) : newsData.length === 0 ? (
          <p className="loading">Loading news...</p>
        ) : (
          <table className="contact-table">
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Title</th>
                <th>Published By</th>
                <th>Images</th>
                <th>Description</th>
                <th>Published Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.publishedBy}</td>
                  <td>
                    {item.images && item.images.length > 0 ? (
                      item.images.map((img, i) => (
                        <img
                          key={i}
                          src={`${img}`}
                          alt="News"
                          style={{
                            width: "60px",
                            height: "auto",
                            marginRight: "5px",
                            borderRadius: "4px",
                          }}
                        />
                      ))
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.description}</td>
                  <td>{item.createdAt?.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default News;
