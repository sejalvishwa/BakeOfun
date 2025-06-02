import "./BakeryBanner.css";

export const BakeryBanner = () => {
  return (
    <div className="bakery-banner-wrapper">
      <div className="bakery-banner-bg">
        <div className="bakery-banner-container">
          <div className="bakery-banner-left">
            <h1 className="bakery-title">
              Fresh Baked,
              <br />
              Daily Delight
            </h1>
            <p className="bakery-subtitle">Handcrafted Made With Love</p>
            <div className="underline"></div>
          </div>

          <div className="bakery-banner-right">
            <div className="highlight-box">
              <h2 className="highlight-title">Taste the BakeOfun Difference</h2>
              <p className="highlight-text">
                From artisan breads to decadent pastries, our bakery offers the freshest,
                most delicious treats in town. Made from scratch daily using premium
                ingredients for that perfect bite every time.
              </p>
              <a href="/enquries" className="contact-button">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="decorative-line">
        <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10C20 0 40 20 60 10C80 0 100 20 120 10" stroke="white" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
};

export default BakeryBanner;