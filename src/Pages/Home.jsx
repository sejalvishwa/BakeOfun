"use client";

import "./Home.css";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import { FeaturedProducts } from "../Components/FeaturedProducts";
import { Carousel } from "../Components/Carousel";
import bannerImage from "../assets/images/Banner-main.jpg";
import machineryIcon from "../assets/images/machinery.png";
import workforceIcon from "../assets/images/workforce.png";
import foodSafetyIcon from "../assets/images/foodsafety.png";
import qualityImage from "../assets/images/quality.png";
import HygieneImage from "../assets/images/hygiene.png";
import tasteImage from "../assets/images/taste.png";
import healthImage from "../assets/images/health.png";
import relianceImage from "../assets/images/reliance.png";
import flipkartImage from "../assets/images/flipkart.png";
import dmartImage from "../assets/images/D-Mart.png";
import bigbasketImage from "../assets/images/bigbasket.png";
import indianrailwayImage from "../assets/images/indianrailways.png";
import YellowLine from "../assets/images/yellowBackground.png";
import banner1 from "../assets/images/AboutBanner1.jpg";
import banner2 from "../assets/images/AboutBanner2.jpg";
import banner3 from "../assets/images/AboutBanner3.jpg";
import { AboutUsSection } from "../Components/AboutUsSection";
import { homeProducts } from "../data/homeProducts";
import BakeryBanner from "../Components/BakeryBanner";
import { OurForte } from "../Components/OurForte";

import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

const aboutUsTitle = "A Li'l bit About Us";

const aboutUsParagraphs = [
  [
    "BakeOFun is an International Quality Food Brand trusted &",
    "acclaimed by Thousands of customers.",
  ],
  [
    "Our ultimate goal is entice our customers & associates with our",
    "honesty, love & purpose in all our endeavours serving Pure, Safe,",
    "Healthy & Hygienic food products.",
  ],
];

const forte = [
  {
    title: "QUALITY",
    description:
      "Handpicked Ingredients to compliment purity & taste. Top Notch packaging for optimum shelf life",
    icon: qualityImage,
  },
  {
    title: "HYGIENE",
    description: "FSSAI, ISO 22000, HACCP Compliant Plant & Operations",
    icon: HygieneImage,
  },
  {
    title: "TASTE",
    description:
      "A wide gamut of tantalizing flavors offered for every palate. Right blend of a variety of Quality Dry Fruit & Nuts",
    icon: tasteImage,
  },
  {
    title: "HEALTH",
    description:
      "Nutritionally sound products with cautious amount of Salt, Sugar & additives",
    icon: healthImage,
  },
];

export const Home = () => {
  const [mainBanner, setMainBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/banners`);
        const banners = res.data.data || [];

        const bannerWithOrderOne = banners.find(
          (banner) => Number(banner.order_number || banner.order) === 1
        );

        setMainBanner(bannerWithOrderOne);
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      }
    };
    fetchBanner();
  }, []);

  return (
    <>
      <Navigation />
      <div className="banner-container">
        {/* Show API banner if exists, else fallback */}
        {mainBanner ? (
          <img
            src={`${API_URL}${mainBanner.image}`}
            alt="Homepage Banner"
            className="banner-img"
          />
        ) : (
          <img src={bannerImage} alt="Default Banner" className="banner-img" />
        )}

        <div className="banner-bottom">
          <a href="/liveproducts">
            <button className="shop-button">SHOP NOW</button>
          </a>
        </div>

        <AboutUsSection
          title={aboutUsTitle}
          paragraphs={aboutUsParagraphs}
          showLearnMore={true}
          onLearnMoreClick={() => console.log("Learn more clicked!")}
        />

        <div className="yellow-line">
          <img src={YellowLine} alt="Yellow Line" className="yellow-line" />
          <Carousel slides={[banner1, banner2, banner3]} />
          <img src={YellowLine} alt="Yellow Line" className="yellow-line" />
        </div>

        <div className="featured-products-home">
          <h2 className="section-title-home">Featured Products</h2>
          <div className="product-container-home">
            {homeProducts.map((product, index) => (
              <div key={index} className="product-card-home">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-home"
                />
                <h3
                  className="product-title-home"
                  style={{
                    fontSize: "0.9rem",
                    textAlign: "center",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="our-focus-section">
          <h1>OUR FOCUS : GOOD WORK</h1>
        </div>

        <div className="why-choose-us">
          <div className="feature-card">
            <img src={machineryIcon} alt="Advanced Plant and Machinery" />
            <p>
              STATE OF THE ART <br /> ADVANCED PLANT AND MACHINERY
            </p>
          </div>
          <div className="feature-card">
            <img src={workforceIcon} alt="Trained Workforce" />
            <p>
              TRAINED, QUALITY CENTRIC <br /> WORKFORCE
            </p>
          </div>
          <div className="feature-card">
            <img src={foodSafetyIcon} alt="Food Safety Standards" />
            <p>
              STRICT COMPLIANCE TO FOOD <br /> SAFETY STANDARDS
            </p>
          </div>
        </div>

        <div className="our-focus-section">
          <h1>OUR FORTE...</h1>
          <OurForte />
        </div>

        <div className="our-presence-section">
          <h1>Our Presence</h1>
          <div className="our-presence-logos">
            <img src={flipkartImage} alt="Flipkart" />
            <img src={dmartImage} alt="D-Mart" />
            <img src={bigbasketImage} alt="BigBasket" />
            <img src={indianrailwayImage} alt="Indian Railway" />
            <img src={relianceImage} alt="Reliance" />
          </div>
        </div>

        <BakeryBanner />
        <Footer />
      </div>
    </>
  );
};
