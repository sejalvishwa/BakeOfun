import "./Footer.css";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "../assets/images/BakeOfun-logo.png";

export const Footer = () => {
  return (
    <>
      {/* Wavy Top Divider */}
      <div className="footer-wave-top">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            fill="#021c63"
            d="M0,96L60,85.3C120,75,240,53,360,48C480,43,600,53,720,69.3C840,85,960,107,1080,117.3C1200,128,1320,128,1380,122.7L1440,117.3L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>

      <footer className="footer-section">
        <div className="footer-container-fluid">
          <div className="footer-row">
            {/* Column 1: About */}
            <div className="footer-column about-column">
              <img src={logo} className="footer-logo" alt="BakeOfun Logo" />
              <div className="footer-about">
                <h4>About the company</h4>
                <p>
                  With over five decades of excellence since 1960, our
                  family-run food business specializes in crafting premium baked
                  goods under the flagship brand ‘BAKEOFUN’. We offer 150+ SKUs
                  including cookies, breads, cakes, and more manufactured at our
                  state-of-the-art facility.
                </p>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-column links-column">
              <h4>Quick Links</h4>
              <ul className="quick-links">
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/liveproducts">Live Products</a>
                </li>
                <li>
                  <a href="/latestnews">Latest News</a>
                </li>
                <li>
                  <a href="/enquries">Contact / Enquiries</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="footer-column social-column">
              <div className="footer-column contact-column">
                <h4>Contact Us</h4>
                <div className="contact-item">
                  <MapPin />
                  <span>
                    ARNA Bakers Private Limited <br />
                    Village Jarauda, Baloda Bazar State Highway <br />
                    RAIPUR 493 221 (C.G.) INDIA
                  </span>
                </div>
                <div className="contact-item">
                  <Phone />
                  <span>
                    Customer Care: +91 95161 95162
                    <br />
                    Landline: +91 771 4905599
                  </span>
                </div>
                <div className="contact-item">
                  <Mail />
                  <span>info@bakeofun.com | arnabakers@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} | Designed & developed by{" "}
            <a
              href="https://concavemedia.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Concave
            </a>{" "}
            &{" "}
            <a
              href="https://inextsoftware.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inext Software Solution Pvt Ltd.
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
