import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import axios from "axios";

import "./NewsDetails.css";

export const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/${id}`);
        setArticle(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Article not found");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="news-details-container" style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Loading article...</h2>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navigation />
        <main className="news-details-container" style={{ padding: "2rem", textAlign: "center" }}>
          <h2>{error || "Article not found"}</h2>
          <button onClick={() => navigate("/news")}>Back to Latest News</button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="news-details-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="/">Home</a> &gt; <a href="/news">Latest News</a> &gt; <span>{article.title}</span>
        </div>

        {/* Title + Meta */}
        <h1 className="news-title">{article.title}</h1>
        <p className="news-meta">
          Published on {formatDate(article.createdAt)} • By {article.publishedBy || "Admin"}
        </p>

        {/* Image */}
        {article.images && article.images.length > 0 && (
          <img src={article.images[0]} alt={article.title} className="news-image" />
        )}

        {/* Description content */}
        <section
          className="news-content"
          dangerouslySetInnerHTML={{ __html: article.description }}
        ></section>

        {/* Tags (if you want to add) */}
        {/* <div className="news-tags">
          <span>Example Tag</span>
        </div> */}

        {/* Share Section */}
        <div className="share-section">
          <h5>Share On:</h5>
          <div className="share-icons">
            <a
              href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(
                article.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaTwitter />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewsDetails;
