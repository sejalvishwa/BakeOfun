import { Navigation } from "../Components/Navigation";
import { ContactUs } from "../Components/ContactUs";
import { Footer } from "../Components/Footer";

import breadBanner from "../assets/images/breadBanner.png";

import "./Enquries.css";

export const Enquries = () => {
  return (
    <>
      <Navigation />

      <div className="enquries-heading">
        <h1>Enquiries</h1>
      </div>

      <div className="enquries-para">
        <p>For Business Enquiries or Feedback, please use the space below</p>
      </div>

      <div className="enquries-form">
        <ContactUs
          showHeading={false}
          mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.893706121128!2d81.7866135!3d21.3546875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd6518878dc5%3A0x70963fa0b2704c56!2sARNA%20Bakers%20Private%20Limited!5e0!3m2!1sen!2sin!4v1748243991679!5m2!1sen!2sin"
          stores={[
            {
              title: "Office Address",
              address: `ARNA Bakers Private Limited,
                    Village Jarauda, Baloda Bazar State Highway,
                    RAIPUR - 493 221, Chhattisgarh, INDIA`,
            },
            {
              title: "Retail Outlets",
              address: `BakeOFun Bake Cafe
                   Gurukripa Complex, Pandri Main Road, Near, Mandi Gate- Ram Mandir Rd · Raipur, Chattisgarh - 492003 `,
              phone: "+91 0771 490 1599",
            },
            {
              address: `BakeOFun Bake House
                  Opp.Universal Electronics, near Vidya Hospital, Shankar Nagar, Raipur, Chhattisgarh - 492007 `,
              phone: "+91 0771 400 4599",
            },
          ]}
        />
      </div>

      <div className="bread-banner">
        <img src={breadBanner} />
      </div>

      <div className="enquries-heading">
        <h1>Careers</h1>
      </div>

      <div className="enquries-para">
        <p>Work with us! Send us your details from the link below</p>
      </div>

      <div className="enquries-btn">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScMJ9_c550fYOHMIyH_H_LpEojF9oY9FqgMgtQ7-Nxx730OUA/viewform"
          className="enquries-link-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          APPLY NOW
        </a>
      </div>
      <Footer />
    </>
  );
};

export default Enquries;
