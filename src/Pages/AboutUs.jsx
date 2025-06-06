import "./AboutUs.css";

import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import { Carousel } from "../Components/Carousel";

import logo from "../assets/images/about-logo-2.png";
// import breadImage from "../assets/images/bread-img-2.png";
import Globe from "../assets/images/Globe.png";
import smallBadge from "../assets/images/small-badge.png";
import retailBakery from "../assets/images/retailbakery.png";
// import BigBadge from "../assets/images/social-reach.png";
import banner1 from "../assets/images/AboutBanner1.jpg";
// import BakeOfunText from "../assets/images/BakeOfun-text.png";
import banner2 from "../assets/images/AboutBanner2.jpg";
import banner3 from "../assets/images/AboutBanner3.jpg";
import ourPlantImage from "../assets/images/our-plant-pic.png"
import AboutUsText from "../assets/images/AboutUsText.png";

export const AboutUs = () => {
  return (
    <>
      <Navigation />
      <Carousel slides={[banner1, banner2, banner3]} />

      {/* <div className="about-us-page">
        <img src={AboutUsText} alt="About Us Text" className="about-us-text" />
      </div> */}

      <section class="about-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 text-center">
                    <div class="about-content mx-auto">
                        <h1 class="about-title">ABOUT US</h1>
                        
                        <h2 class="about-subtitle">We are Arna Bakers Private Limited</h2>
                        
                        <p class="about-text">
                            Our Food-Business Family's commitment in crafting Quality Baked Food & 
                            Confectionary products spans over five decades (since 1960).
                        </p>
                        
                        <p class="about-text">
                            We are into Manufacturing, distribution & retail of premium baked food 
                            products viz. Cookies, Rusks, Breads, Cakes, Muffins, Puffs, Pastries etc. under 
                            our flagship brand- 'BAKEOFUN'.
                        </p>
                        
                        <p class="about-text">
                            Our products offerings include more than 150 SKUs which are regularly crafted 
                            in our state-of-the-art industrial unit.
                        </p>
                        
                        <p class="about-text">
                            We have been the Contract Manufacturers of 'Parle-G' biscuits for Parle Biscuits 
                            Pvt. Ltd. in Raipur & U.P; the CM Unit of 'Parle' in Raipur was set up by us in the 
                            year 2011 which happens to be the largest Automatic Biscuit Plant of 
                            Chhattisgarh.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

      <div className="container-fluid the-brand">
        <div className="row align-items-center" style={{ backgroundColor: "#BC83661A" , paddingBottom: "50px" }}>
          <div className="col-md-6" >
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
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid plant-section">
        <div className="row align-items-center p-5" style={{ backgroundColor: "#F8F8F8" }}>
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
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="breadImage" style={{ marginTop: "50px" }}>
              <img src={ourPlantImage} alt="Bread" />
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid our-reach-main">
        <div className="row align-items-center mt-5" style={{ backgroundColor: "#F8F3F0" , paddingBottom: "30px" }}>
          <div className="col-5 BigBadge">
            <img src={Globe} alt="Big Badge" className="img-fluid" />
          </div>

          <div className="col-7" style={{ paddingRight: "80px" }}>
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
