import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaGooglePlusG,
  FaLinkedinIn,
} from "react-icons/fa";
import "./FloatingSocialIcons.css";

export const FloatingSocialIcons = () => {
  return (
    <div className="floating-social-icons">
      <a href="https://www.facebook.com/BakeOFun/" target="_blank" rel="noopener noreferrer" className="facebook">
        <FaFacebookF />
      </a>
      <a href="https://www.instagram.com/bakeofun/#" target="_blank" rel="noopener noreferrer" className="instagram">
        <FaInstagram />
      </a>
      <a href="https://x.com/bakeofun" target="_blank" rel="noopener noreferrer" className="twitter">
        <FaTwitter />
      </a>
      <a href="https://wa.me/919516195162" target="_blank" rel="noopener noreferrer" className="whatsapp">
        <FaWhatsapp />
      </a>
      <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer" className="googleplus">
        <FaGooglePlusG />
      </a>
      <a href="https://www.linkedin.com/company/arna-bakers-private-limited/" target="_blank" rel="noopener noreferrer" className="linkedin">
        <FaLinkedinIn />
      </a>
    </div>
  );
};

export default FloatingSocialIcons;
