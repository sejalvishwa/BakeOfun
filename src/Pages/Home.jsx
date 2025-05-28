import "./Home.css";
import { Navigation } from "../Components/Navigation";
import { ContactUs } from "../Components/ContactUs";
import { Footer } from "../Components/Footer";
import { FeaturedProducts } from "../Components/FeaturedProducts";
import bannerImage from "../assets/images/Banner.png";
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
import { AboutUsSection } from "../Components/AboutUsSection";  
import { homeProducts } from "../data/homeProducts";



const aboutUsTitle = "A Li'l bit About Us";

const aboutUsParagraphs = [
  [
    "BakeOFun is an International Quality Food Brand trusted &",
    "acclaimed by Thousands of customers."
  ],
  [
    "Our ultimate goal is entice our customers & associates with our",
    "honesty, love & purpose in all our endeavours serving Pure, Safe,",
    "Healthy & Hygienic food products."
  ]
];


const forte = [
  {
    title: "QUALITY",
    description: "Handpicked Ingredients to compliment purity & taste.Top Notch packaging for optimum shelf life",
    icon: qualityImage
  },
  {
    title: "HYGIENE",
    description: "FSSAI, ISO 22000, HACCP Compliant Plant & Operations",
    icon: HygieneImage
  },
  {
    title: "TASTE",
    description: "A wide gamut of tantalizing flavors offered for every palate.Right blend of a variety of Quality Dry Fruit & Nuts",
    icon: tasteImage
  },
  {
    title: "HEALTH",
    description: "Nutritionally sound products with cautious amount of Salt, Sugar & additives",
    icon: healthImage
  }
];

export const Home = () => {
  return (
    <>
    <Navigation/>
    <div className="banner-container">
      <img src={bannerImage} alt="BakeOfun Banner" className="banner-img" />
      
      <div className="banner-bottom">
        <button className="shop-button">SHOP NOW</button>
      </div>

      <AboutUsSection
        title={aboutUsTitle}
        paragraphs={aboutUsParagraphs}
        showLearnMore={true}
        onLearnMoreClick={() => console.log("Learn more clicked!")}  
      />

     <FeaturedProducts products={homeProducts} showTitle={true} />


      <div className="our-focus-section">
        <h1>OUR FOCUS : GOOD WORK</h1>
      </div>

<div className="why-choose-us">
  <div className="feature-card">
    <img src={machineryIcon} alt="Advanced Plant and Machinery" />
    <p>STATE OF THE ART <br /> ADVANCED PLANT AND MACHINERY</p>
  </div>
  <div className="feature-card">
    <img src={workforceIcon} alt="Trained Workforce" />
    <p>TRAINED, QUALITY CENTRIC <br /> WORKFORCE</p>
  </div>
  <div className="feature-card">
    <img src={foodSafetyIcon} alt="Food Safety Standards" />
    <p>STRICT COMPLIANCE TO FOOD <br /> SAFETY STANDARDS</p>
  </div>
</div>

      <div className="our-focus-section">
        <h1>OUR FORTE...</h1>
        
      <div className="our-forte-section">
  {forte.map((item, idx) => (
    <div className="forte-items" key={idx}>
      <img src={item.icon} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ))}
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


      </div>
      <ContactUs  mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.3505874802427!2d81.65115787394123!3d21.257585679882396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd7a16c9107f%3A0xac3933ec40743ead!2sBakeOFun%20Bake%20Cafe!5e0!3m2!1sen!2sin!4v1747913432030!5m2!1sen!2sin"
      stores = {[
        {
          title: "Retail Store 1",
          address: `BakeOFun Bake Cafe,
          \nGurukripa Complex, Pandri Main Road, Near Mandi Gate - Ram Mandir Rd - Raipur, Chhattisgarh 492003`,
          phone: "+91 0771 490 1599"
        },
        {
          title: "Retail Store 2",
          address: `BakeOFun Bake Cafe,
          \nOpp. Universal Electronics, near Vidya Hospital Shankar Nagar Main Road, Raipur, Chhattisgarh 492007`,
          phone: "+91 0771 400 4599"
        }]}
       />
<Footer />
    </div>
    </>
  );
};
