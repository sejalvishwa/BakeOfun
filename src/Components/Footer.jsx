import "./Footer.css";
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from "../assets/images/BakeOfun-logo.png";

export const Footer = () => {
  return (
    <>
    <footer className="footer-section">
      <div className="footer-container-fluid">
        <div className="footer-row">
          
          {/* Column 1: About */}
          <div className="footer-column about-column">
            <img src={logo} className="footer-logo" alt="BakeOfun Logo" />
            <div className="footer-about">
              <h4>About the company</h4>
              <p>
               With over five decades of excellence since 1960, our family-run food business specializes in crafting premium baked goods under the flagship brand ‘BAKEOFUN’. We offer 150+ SKUs including cookies, breads, cakes, and more—manufactured at our state-of-the-art facility. 
              </p>
            </div>
          </div>

          {/* Column 2: Contact */}
<div className="footer-column links-column">
  <h4>Quick Links</h4>
  <ul className="quick-links">
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/liveproducts">Live Products</a></li>
    <li><a href="/latestnews">Latest News</a></li>
    <li><a href="/enquries">Contact / Enquiries</a></li>
  </ul>
</div>

          {/* Column 3: Social Media */}
          <div className="footer-column social-column">
           
             <div className="footer-column contact-column">
            <h4>Contact Us</h4>
            <div className="contact-item">
              <MapPin />
              <span>ARNA Bakers Private Limited <br/>Village Jarauda, Baloda Bazar State Highway <br/>RAIPUR 493 221 (C.G.) INDIA</span>
            </div>
            <div className="contact-item">
              <Phone />
              <span>Customer Care: +91 95161 95162
Landline : +91 771 4905599</span>
            </div>
            <div className="contact-item">
              <Mail />
              <span>info@bakeofun.com | arnabakers@gmail.com</span>
            </div>
          </div>
          </div>

        </div>
      </div>
      
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} | Designed & developed by Concave & <a href="https://inextsoftware.in/">Inext Software Solution Pvt Ltd.</a></p>
    </div>
    </footer>

    </>
  );
};

export default Footer;
