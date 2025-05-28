import "./AboutUs.css";

import { Navigation } from "../Components/Navigation";
import { Carousel } from "../Components/Carousel";
import { Footer } from "../Components/Footer";

import AboutBanner1 from "../assets/images/AboutBanner1.jpg";
import AboutBanner2 from "../assets/images/AboutBanner2.jpg";
import AboutBanner3 from "../assets/images/AboutBanner3.jpg";
import logo from "../assets/images/about-logo.jpg";
import breadImage from "../assets/images/bread-img.png";
import smallBadge from "../assets/images/small-badge.png";
import retailBakery from "../assets/images/retailbakery.png";
import BigBadge from "../assets/images/BigBadge.png";
import { AboutUsSection } from "../Components/AboutUsSection";

export const AboutUs = () => {
  const slides = [AboutBanner1, AboutBanner2, AboutBanner3];

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
      <div style={{ width: "100%", position: "relative", zIndex: 10 }}>
        <Carousel slides={slides} />
      </div>
      <div className="about-us-page">
        <AboutUsSection title="ABOUT US" paragraphs={aboutContent} />
      </div>

      <div className="yellow-bar"></div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="logo">
              <img src={logo} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-logo-section">
              <div className="about-logo-right">
                <h2>The Brand: Bake 'O' Fun</h2>
              </div>
              <div className="trusted-para">
                <p>
                  We are a Trusted International Quality Food Brand: Bake 'O'
                  Fun.
                </p>
              </div>
              <div className="ultimate-goal-para">
                <p>
                  Our ultimate goal is entice our customers & associates with
                  our honesty, love & purpose in all our endeavours serving
                  Pure, Safe, Healthy & Hygienic food products
                </p>
              </div>
              <div>
                <p>
                  We believe that the ‘Food Business’ is one of the vital
                  industries involving highly meticulous tasks. Because every
                  task involved in crafting an edible item is constantly
                  vulnerable to hazards. Taste & aroma are perceivable by senses
                  but food safety is not easily traceable in a food product.{" "}
                </p>
              </div>
              <div>
                <p>
                  This is where a consumer’s trust on a Brand bolsters his
                  discretion.
                </p>
              </div>
              <div>
                <p>
                  From careful selection of best raw materials to compliance of
                  GMP in shopfloor activities, from safe & environment friendly
                  packaging to efficient supply chain, utmost care is taken to
                  keep the freshness & Quality of product intact.{" "}
                </p>
              </div>
              <div>
                <p>
                  As a responsible Food Business Operator we believe that
                  whenever you open a packaged food product it must be 100% safe
                  as well as healthy for the whole family.{" "}
                </p>
              </div>
              <div>
                <p>
                  We don’t use unnecessary or cheap taste enhancers or colors
                  that can pose health hazards for any of the family members-
                  young or seniors. We also use cautious amount of salt, sugar &
                  additives in all our production recipes.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="yellow-bar"></div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="breadImage">
              <img src={breadImage} />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div className="our-plant">
                <h2>Our Plant, Men & Technology</h2>
              </div>

              <div className="plant-para-section">
                <div className="manuacturing-unit-para">
                  <p>
                    Our manufacturing unit is located in clean environment in
                    the outskirts of Raipur with abundance of fresh water. This
                    water is further treated with R.O. System before processing.
                  </p>
                </div>

                <div className="manuacturing-unit-para">
                  <p>
                    The Factory Building is built with special care to fully
                    comply with globally recognized Food Safety Standards.{" "}
                  </p>
                </div>

                <div className="manuacturing-unit-para">
                  <p>
                    Our Modern Plant Machinery is automated to minimize human
                    hands’ interaction to ensure zero foreign matter
                    contamination. The installed production capacity of our
                    plant is 150 MT per month.
                  </p>
                </div>

                <div>
                  <p>
                    Our Plant is not only compliant with statutory Food Safety
                    Norms like FSSAI but also supplementary FSMS like ISO:22000
                    & HACCP.{" "}
                  </p>
                </div>

                <div>
                  <p>
                    Our Workforce : Every person involved with us is trained to
                    be inculcated with the idea of Fresh & Clean Food that
                    ‘BakeOFun’ is meant for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="yellow-bar"></div>

      <div className="container our-reach-main">
        <div className="row">
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

            <div>
              <div class="container">
                <div class="row">
                  <div class="col-3">
                    <div className="smallBadge">
                      <img src={smallBadge} />
                    </div>
                  </div>
                  <div class="col-9 reach-recognition">
                    <h4>REACH & RECOGNITION</h4>
                    <p>
                      We cater to more than 1500 retail outlets daily through
                      our robust dealer & distributor network across
                      Chhattisgarh & parts of Odisha. Our products are also
                      approved and sold by Modern trade giants like Dmart,
                      Walmart, Reliance retail & Big Basket.{" "}
                    </p>
                    <p>
                      Brand - ‘Bake O Fun’ is approved by South Eastern Central
                      Railways (Indian Railways) for products supply at all
                      static catering units at SECR stations.
                    </p>
                  </div>
                </div>
              </div>

              <hr></hr>

              <div class="container">
                <div class="row">
                  <div class="col-3">
                    <div className="smallBadge">
                      <img src={retailBakery} />
                    </div>
                  </div>
                  <div class="col-9 reach-recognition">
                    <h4>RETAIL BAKERY</h4>
                    <p>
                      Our company operates two Premium Retail Bakery Outlets
                      near Mandi Gate, Pandri & Shankar Nagar Main Road, Raipur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 BigBadge">
            <img src={BigBadge} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
