"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LatestNews.css";
import { Navigation } from "../Components/Navigation.jsx";
import { Footer } from "../Components/Footer.jsx";

import StadiumImage from "../assets/images/stadium-news.png";
import MediaCampaign from "../assets/images/mediacampaign.svg";
import BrandPromotion from "../assets/images/brandPromotion.png";
import CustomerStories from "../assets/images/customerStories.jpg";

export const LatestNews = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const featuredNews = {
    id: 1,
    title: "BakeOFun Makes a Sweet Impression During India vs New Zealand ODI at Naya Raipur",
    excerpt:
      "BakeOFun shined at the India vs New Zealand 2nd ODI on January 21, 2023, at Naya Raipur's Shaheed Veer Narayan Singh Stadium...",
    image: StadiumImage,
    category: "Brand Promotion",
    date: "2023-01-21",
    readTime: "3 min read",
  };

  const newsArticles = [
    {
      id: 2,
      title: "Media Campaign Success: BakeOFun Reaches 1 Million Customers",
      excerpt: "Our recent media campaign has successfully reached over 1 million customers across digital platforms.",
      image: MediaCampaign,
      category: "Media Campaign",
      date: "2024-01-12",
      readTime: "2 min read",
    },
    {
      id: 3,
      title: "Brand Promotion: Partnership with Local Communities",
      excerpt: "BakeOFun announces exciting partnerships with local communities to bring fresh, quality baked goods closer to families.",
      image: BrandPromotion,
      category: "Brand Promotion",
      date: "2024-01-10",
      readTime: "4 min read",
    },
    {
      id: 5,
      title: "Customer Stories: Spreading Goodness & Smiles",
      excerpt: "Heartwarming stories from our customers about how BakeOFun products have become part of their special moments.",
      image: CustomerStories,
      category: "Customer Stories",
      date: "2024-01-05",
      readTime: "3 min read",
    },
  ];

  const categories = ["All", "Media Campaign", "Brand Promotion", "Product Launch", "Customer Stories"];

  const filteredArticles =
    activeCategory === "All" ? newsArticles : newsArticles.filter((article) => article.category === activeCategory);

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
        {/* Header Section */}
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

        <div className="main-content">
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured News */}
          <div className="featured-section">
            <h2>Featured Story</h2>
            <div className="featured-card">
              <div className="featured-image">
                <img src={featuredNews.image} alt={featuredNews.title} />
                {/* Category badge removed */}
                {/* <span className="category-badge featured-badge">{featuredNews.category}</span> */}
              </div>
              <div className="featured-content">
                <h3>{featuredNews.title}</h3>
                <p>{featuredNews.excerpt}</p>
                <div className="article-meta">
                  <span className="date">📅 {formatDate(featuredNews.date)}</span>
                  <span className="read-time">⏱️ {featuredNews.readTime}</span>
                </div>
                <button className="read-more-btn" onClick={() => navigate(`/news/${featuredNews.id}`)}>
                  Read More →
                </button>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="news-section">
            <h2>Latest News</h2>
            <div className="news-grid">
              {filteredArticles.map((article) => (
                <div key={article.id} className="news-card">
                  <div className="card-image">
                    <img src={article.image} alt={article.title} />
                    {/* Category badge removed */}
                    {/* <span className="category-badge">{article.category}</span> */}
                  </div>
                  <div className="card-content">
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="article-meta">
                      <span className="date">📅 {formatDate(article.date)}</span>
                      <span className="read-time">⏱️ {article.readTime}</span>
                    </div>
                    <button className="read-more-btn" onClick={() => navigate(`/news/${article.id}`)}>Read More →</button>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="load-more-section">
            <button className="load-more-btn">Load More Articles</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LatestNews;
