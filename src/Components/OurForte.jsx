import "./OurForte.css";
import centerImage from "../assets/images/center-image.png";
// import breadBanner from "../assets/images/breadBanner.png"

export const OurForte = () => {
  return (
    <section className="our-forte-bg-section">
      <div className="centered-image-wrapper">
        <img src={centerImage} alt="Center Image" className="center-image" />
      </div>
    </section>
  );
};

export default OurForte;
