import "./AboutUs.css";

import { Navigation } from "../Components/Navigation";

import { Footer } from "../Components/Footer";

import logo from "../assets/images/about-logo-2.png";
import breadImage from "../assets/images/bread-img-2.png";
import smallBadge from "../assets/images/small-badge.png";
import retailBakery from "../assets/images/retailbakery.png";
import BigBadge from "../assets/images/social-reach.png";
import Banner from "../assets/images/About-Us Banner.png";
import YellowBorder from "../assets/images/yellow-border.png";
import { AboutUsSection } from "../Components/AboutUsSection";
import { useState } from "react";

export const AboutUs = () => {

  const [expanded, setExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMoreBrand = () => {
    setExpanded(!expanded);
  };

  const toggleReadMorePlant = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleExpand = () => setExpanded(!expanded);
  

  const aboutContent = [
    [<strong>We are Arna Bakers Private Limited</strong>],
    [
      "Our Food-Business Family’s commitment in crafting Quality Baked Food & Confectionary products spans over five decades (since 1960).",
    ],
    [
      "We are into Manufacturing, distribution & retail of premium baked food products viz. Cookies, Rusks, Breads, Cakes, Muffins, Puffs, Pastries etc. under our flagship brand- ‘BAKEOFUN’.",
    ],
    [
      "Our products offerings include more than 150 SKUs which are regularly crafted in our state-of-the-art industrial unit.",
    ],
    [
      "We have been the Contract Manufacturers of ‘Parle-G’ biscuits for Parle Biscuits Pvt. Ltd. in Raipur & U.P; the CM Unit of ‘Parle’ in Raipur was set up by us in the year 2011 which happens to be the largest Automatic Biscuit Plant of Chhattisgarh.",
    ],
  ];

  return (
    <>
      <Navigation />
      <div className="Banner-image">
        <img src={Banner}/>
      </div>
      <div className="about-us-page">
        <AboutUsSection title="ABOUT US" paragraphs={aboutContent} />
      </div>

  <div className="yellow-border">
  <img src={YellowBorder} alt="Yellow Border" style={{ width: '100%', display: 'block' }} />
</div>

      
      <div className="container-fluid the-brand">
        <div className="row align-items-center mb-5" style={{ backgroundColor: "#ECEEF6" }}>
      <div className="col-md-6">
        <div className="logo">
          <img src={logo} alt="Bake 'O' Fun" />
        </div>
      </div>
      <div className="col-md-6">
        <div className="about-logo-section">
          <div className="about-logo-right">
            <h2>The Brand: Bake 'O' Fun</h2>
          </div>
          <div className="trusted-para">
            <p>We are a Trusted International Quality Food Brand: Bake 'O' Fun.</p>
          </div>
          <div className="ultimate-goal-para">
            <p>
              Our ultimate goal is to entice our customers & associates with our honesty, love & purpose in all our
              endeavours serving Pure, Safe, Healthy & Hygienic food products.
            </p>
          </div>

          {!expanded ? (
            <>
              <p>
                We believe that the ‘Food Business’ is one of the vital industries involving highly meticulous tasks...
              </p>
              <button className="btn btn-link p-0 pb-4" onClick={toggleReadMoreBrand}>Read More</button>
            </>
          ) : (
            <>
              <p>
                We believe that the ‘Food Business’ is one of the vital industries involving highly meticulous tasks.
                Because every task involved in crafting an edible item is constantly vulnerable to hazards. Taste & aroma
                are perceivable by senses but food safety is not easily traceable in a food product.
              </p>
              <p>This is where a consumer’s trust on a Brand bolsters his discretion.</p>
              <p>
                From careful selection of best raw materials to compliance of GMP in shopfloor activities, from safe &
                environment friendly packaging to efficient supply chain, utmost care is taken to keep the freshness &
                Quality of product intact.
              </p>
              <p>
                As a responsible Food Business Operator we believe that whenever you open a packaged food product it must
                be 100% safe as well as healthy for the whole family.
              </p>
              <p>
                We don’t use unnecessary or cheap taste enhancers or colors that can pose health hazards for any of the
                family members—young or seniors. We also use cautious amount of salt, sugar & additives in all our
                production recipes.
              </p>
              <button className="btn btn-link p-0 pb-5" onClick={toggleReadMoreBrand}>
                Read Less
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
      <div className="yellow-bar"></div>

      <div className="container-fluid m-0 ">
         <div className="row align-items-center p-5" style={{ backgroundColor: "#F2E6EE" }}>
      <div className="col-md-7">
        <div>
          <div className="our-plant">
            <h2>Our Plant, Men & Technology</h2>
          </div>

          <div className="plant-para-section">
            <div className="manuacturing-unit-para">
              <p>
                Our manufacturing unit is located in clean environment in the
                outskirts of Raipur with abundance of fresh water. This water is
                further treated with R.O. System before processing.
              </p>
            </div>

            <div className="manuacturing-unit-para">
              <p>
                The Factory Building is built with special care to fully comply
                with globally recognized Food Safety Standards.
              </p>
            </div>

            {isExpanded && (
              <>
                <div className="manuacturing-unit-para">
                  <p>
                    Our Modern Plant Machinery is automated to minimize human
                    hands’ interaction to ensure zero foreign matter contamination.
                    The installed production capacity of our plant is 150 MT per month.
                  </p>
                </div>

                <div>
                  <p>
                    Our Plant is not only compliant with statutory Food Safety Norms
                    like FSSAI but also supplementary FSMS like ISO:22000 & HACCP.
                  </p>
                </div>

                <div>
                  <p>
                    Our Workforce: Every person involved with us is trained to
                    be inculcated with the idea of Fresh & Clean Food that
                    ‘BakeOFun’ is meant for.
                  </p>
                </div>
              </>
            )}
            <button className="btn btn-link p-0 mt-2" onClick={toggleReadMorePlant}>
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-5">
        <div className="breadImage">
          <img src={breadImage} alt="Bread" />
        </div>
      </div>
    </div>
      </div>
      <div className="yellow-bar"></div>

      <div className="container-fluid our-reach-main">
      <div className="row align-items-center mt-5" style={{ backgroundColor: "#F9EDEB" }}>
        <div className="col-6 BigBadge">
          <img src={BigBadge} alt="Big Badge" className="img-fluid" />
        </div>

        <div className="col-6">
          <div className="Our-reach-heading">
            <h2>Our Reach</h2>
          </div>

          <div className="our-reach-para1">
            <p>
              Our ‘Bake O Fun’ products are not only delectable & tempting,
              but our brand epitomizes trust & reliance. Today ‘BakeOFun’ is
              recognised as a Trusted Food Brand by thousands of our valued
              consumers.
            </p>
          </div>

          {/* Expandable Section */}
          {expanded && (

            <>
              <div className="container">
                <div className="row">
                  <div className="col-3">
                    <div className="smallBadge">
                      <img src={smallBadge} alt="Small Badge" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-9 reach-recognition">
                    <h4>REACH & RECOGNITION</h4>
                    <p>
                      We cater to more than 1500 retail outlets daily through
                      our robust dealer & distributor network across
                      Chhattisgarh & parts of Odisha. Our products are also
                      approved and sold by Modern trade giants like Dmart,
                      Walmart, Reliance retail & Big Basket.
                    </p>
                    <p>
                      Brand - ‘Bake O Fun’ is approved by South Eastern Central
                      Railways (Indian Railways) for product supply at all
                      static catering units at SECR stations.
                    </p>
                  </div>
                </div>
              </div>

              <hr />

              <div className="container">
                <div className="row">
                  <div className="col-3">
                    <div className="smallBadge">
                      <img src={retailBakery} alt="Retail Bakery" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-9 reach-recognition">
                    <h4>RETAIL BAKERY</h4>
                    <p>
                      Our company operates two Premium Retail Bakery Outlets
                      near Mandi Gate, Pandri & Shankar Nagar Main Road, Raipur.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <button className="btn btn-link p-0 pb-5 mt-2" onClick={toggleExpand}>
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
     

      <Footer />
    </>
  );
};

export default AboutUs;
