import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";

import StadiumImage from "../assets/images/stadium-news.png";
import MediaCampaign from "../assets/images/mediacampaign.svg";
import BrandPromotion from "../assets/images/brandPromotion.png";
import CustomerStories from "../assets/images/customerStories.jpg";

import './NewsDetails.css';

// Your news data with full content for each article
const newsData = [
  {
    id: 1,
    title: "BakeOFun Makes a Sweet Impression During India vs New Zealand ODI at Naya Raipur",
    author: "John Doe",
    date: "January 21, 2023",
    image: StadiumImage,
    content: (
      <>
        <p>
          BakeOFun shined at the India vs New Zealand 2nd ODI on January 21, 2023, held at the spectacular Shaheed Veer Narayan Singh International Cricket Stadium in Naya Raipur. As cricket fans gathered in thousands to witness a thrilling encounter between the two powerhouse teams, BakeOFun added its own flavour to the occasion — quite literally.
        </p>
        <p>
          The match wasn’t just about boundaries and wickets — it was about the joy of community, celebration, and of course, great food. BakeOFun set up vibrant stalls throughout the venue, offering delicious baked treats that quickly became the crowd's favorite snack.
        </p>
        <blockquote>
          “We wanted to blend the excitement of cricket with the sweetness of celebration,” said a spokesperson from BakeOFun.
        </blockquote>
        <p>
          From soft cupcakes to crisp cookies and rich pastries, the aroma and taste left a lasting impression — much like the match itself. BakeOFun also ran a digital selfie booth and free sampling counter, engaging fans of all ages and creating moments worth remembering.
        </p>
      </>
    ),
    tags: ["Featured Story", "News", "BakeOfun"],
  },
  {
    id: 2,
    title: "Media Campaign Success: BakeOFun Reaches 1 Million Customers",
    author: "Jane Smith",
    date: "January 12, 2024",
    image: MediaCampaign,
    content: (
      <>
        <p>
          Our recent media campaign has successfully reached over 1 million customers across digital platforms, significantly increasing brand awareness and engagement.
        </p>
        <p>
          This success showcases BakeOFun's strong connection with its audience and highlights the power of targeted advertising.
        </p>
      </>
    ),
    tags: ["Media Campaign", "Success", "BakeOfun"],
  },
  {
    id: 3,
    title: "Brand Promotion: Partnership with Local Communities",
    author: "Alex Johnson",
    date: "January 10, 2024",
    image: BrandPromotion,
    content: (
      <>
        <p>
          BakeOFun announces exciting partnerships with local communities to bring fresh, quality baked goods closer to families and promote local businesses.
        </p>
        <p>
          These partnerships are designed to support sustainable growth and foster community spirit.
        </p>
      </>
    ),
    tags: ["Brand Promotion", "Community", "BakeOfun"],
  },
  {
    id: 5,
    title: "Customer Stories: Spreading Goodness & Smiles",
    author: "Emily Davis",
    date: "January 05, 2024",
    image: CustomerStories,
    content: (
      <>
        <p>
          Heartwarming stories from our customers about how BakeOFun products have become part of their special moments and celebrations.
        </p>
        <p>
          These stories inspire us to keep delivering quality and love in every bite.
        </p>
      </>
    ),
    tags: ["Customer Stories", "Community", "BakeOfun"],
  },
];

export const NewsDetails = () => {
  const { id } = useParams();
  const articleId = parseInt(id, 10);

  const article = newsData.find((item) => item.id === articleId);

  const navigate = useNavigate();

  if (!article) {
    return (
      <>
        <Navigation />
        <main className="news-details-container" style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Article not found</h2>
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
        <div className="breadcrumb">
          <a href="/">Home</a> &gt; <a href="/news">Latest News</a> &gt; <span>{article.title}</span>
        </div>

        <h1 className="news-title">{article.title}</h1>
        <p className="news-meta">
          Published on {article.date} • By {article.author}
        </p>

        <img src={article.image} alt={article.title} className="news-image" />

        <section className="news-content">{article.content}</section>

        <div className="news-tags">
          {article.tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>

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
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon-link">
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
