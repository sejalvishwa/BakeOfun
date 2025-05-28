import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import { FeaturedProducts } from "../Components/FeaturedProducts";
import zomatoLogo from "../assets/images/zomato_logo.png";
import swiggyLogo from "../assets/images/swiggy_logo.png";
import { products } from "../data/products";
import { homeProducts } from "../data/homeProducts";

export const ProductDetail = () => {
  const { slug } = useParams();

  // Try to find product in both arrays
  const fromHome = homeProducts.find((p) => p.slug === slug);
  const fromLive = products.find((p) => p.slug === slug);

  const product = fromHome || fromLive;

  // Use recommendations only from the same source array
  const sameSource = fromHome ? homeProducts : products;
  const recommendations = sameSource.filter((p) => p.slug !== slug).slice(0, 4);

  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  return (
    <>
      <Navigation />

      <div className="container my-5">
        <div className="row align-items-start">
          {/* Product Image */}
          <div
            className="col-md-6 mb-4"
            style={{ overflow: "hidden", display: "inline-block" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                maxWidth: "70%",
                height: "auto",
                transition: "transform 0.3s ease",
                cursor: "zoom-in",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6 product-info">
            <h2>{product.name}</h2>
            <p className="text-muted price">{product.price}</p>

            <div className="share-section mt-3">
              <button className="btn btn-outline-primary me-2">Share</button>
            </div>

            <div className="availability mt-5">
              <h5>Available on:</h5>
              <img
                src={zomatoLogo}
                alt="Zomato"
                className="me-3"
                style={{width:"auto" , height: "40px" }}
              />
              <img
                src={swiggyLogo}
                alt="Swiggy"
                style={{ width:"auto" ,height: "40px" }}
              />
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <hr className="my-5" />
        <div className="you-may-also-like">
          <h2 className="mb-4">You May Also Like</h2>
          <FeaturedProducts products={recommendations} showTitle={false} />
        </div>
      </div>

      <Footer />
    </>
  );
};
