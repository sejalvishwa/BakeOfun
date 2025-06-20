"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LatestNews.css";
import { Navigation } from "../Components/Navigation.jsx";
import { Footer } from "../Components/Footer.jsx";
import axios from "axios";

export const LatestNews = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredNews, setFeaturedNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch Featured and Latest News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [featuredRes, latestRes] = await Promise.all([
          axios.get("http://localhost:5000/api/news?isFeatured=true"),
          axios.get("http://localhost:5000/api/news?isFeatured=false"),
        ]);

        const featuredData = featuredRes.data?.data || [];
        const latestData = latestRes.data?.data || [];

        setFeaturedNews(featuredData[0]); // Display the first featured news
        setLatestNews(latestData);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = [
    "All",
    "Media Campaign",
    "Brand Promotion",
    "Product Launch",
    "Customer Stories",
  ];

  const filteredArticles =
    activeCategory === "All"
      ? latestNews
      : latestNews.filter((article) => article.category === activeCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Navigation />
      <div className="news-container">
        <div className="news-header">
          <div className="header-content">
            <h1>Latest News</h1>
            <p className="subtitle">Media Campaigns & Brand Promotions</p>
            <p className="description">
              Stay updated with the latest happenings at BakeOFun - from exciting product launches to community initiatives that spread goodness and smiles.
            </p>
          </div>
        </div>
        <hr />

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading news...</p>
        ) : (
          <div className="main-content">
            {/* Category Filter */}
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured News */}
            {featuredNews && (
              <div className="featured-section">
                <h2>Featured Story</h2>
                <div className="featured-card">
                  <div className="featured-image">
                    <img
                      src={featuredNews.images?.[0]}
                      alt={featuredNews.title}
                    />
                  </div>
                  <div className="featured-content">
                    <h3>{featuredNews.title}</h3>
                    <p>{featuredNews.description?.substring(0, 150)}...</p>
                    <div className="article-meta">
                      <span className="date">
                        📅 {formatDate(featuredNews.createdAt)}
                      </span>
                    </div>
                    <button
                      className="read-more-btn"
                      onClick={() => {
                        navigate(`/news/${featuredNews._id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Latest News */}
            <div className="news-section">
              <h2>Latest News</h2>
              <div className="news-grid">
                {filteredArticles.map((article) => (
                  <div key={article._id} className="news-card">
                    <div className="card-image">
                      <img
                        src={article.images?.[0] || "/default-img.jpg"}
                        alt={article.title}
                      />
                    </div>
                    <div className="card-content">
                      <h3>{article.title}</h3>
                      <p>{article.description?.substring(0, 100)}...</p>
                      <div className="article-meta">
                        <span className="date">
                          📅 {formatDate(article.createdAt)}
                        </span>
                      </div>
                      <button
                        className="read-more-btn"
                        onClick={() => {
                          navigate(`/news/${article._id}`);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More (static for now) */}
            <div className="load-more-section">
              <button className="load-more-btn">Load More Articles</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LatestNews;
