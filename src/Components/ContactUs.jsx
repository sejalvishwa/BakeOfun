import "./ContactUs.css";

export const ContactUs = ({ showHeading = true, mapSrc, stores = [] }) => {
  return (
    <div>
      {showHeading && (
        <div className="contact-us-container">
          <h1>CONTACT US</h1>
        </div>
      )}

      {mapSrc && (
        <div className="map-section">
          <iframe
            title="Map Location"
            src={mapSrc}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      <div className="contact-flex">
        {/* Contact Form */}
        <div>
          <form className="contact-form">
            <label>
              Name/Last Name
              <input type="text" placeholder="Your full name" required />
            </label>
            <label>
              E-mail
              <input type="email" placeholder="Your email address" required />
            </label>
            <label>
              Message
              <textarea placeholder="Write a message" required></textarea>
            </label>
            <button type="submit">Send</button>
          </form>
        </div>

        {/* Store Details */}
        <div className="store-details">
          {stores.map((store, index) => (
            <div key={index}>
              <h3>{store.title}</h3>
              <p style={{ whiteSpace: "pre-line" }}>{store.address}</p>
              <p>{store.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
