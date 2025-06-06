import { useParams } from "react-router-dom";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import zomatoLogo from "../assets/images/zomato_logo.png";
import swiggyLogo from "../assets/images/swiggy_logo.png";
import { initialBreadProducts } from "./BreadPage"; // You may need to export this
import { Link } from "react-router-dom";

export const BreadProductDetail = () => {
  const { slug } = useParams();
  const product = initialBreadProducts.find((p) => p.slug === slug);
  const recommendations = initialBreadProducts.filter((p) => p.slug !== slug).slice(0, 4);

  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  return (
    <>
      <Navigation />
      <div className="container my-5">
        <div className="row align-items-start">
          <div className="col-md-6 mb-4 zoom-container">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded zoom-on-hover"
              style={{ maxWidth: "70%", height: "auto" }}
            />
          </div>
          <div className="col-md-6 product-info">
            <div className="product-header">
              <h2>{product.name}</h2>
              <p className="price">₹{product.price}</p>
            </div>

            <div className="share-section-project">
              <button className="btn btn-outline-primary" style={{ pointerEvents: "none" }}>
                Share
              </button>
            </div>

            <div className="availability mt-4">
              <h5>Available on:</h5>
              <div className="platform-logos">
                <img src={zomatoLogo} alt="Zomato" />
                <img src={swiggyLogo} alt="Swiggy" />
              </div>
            </div>

            <div className="product-description-section mt-5">
              <h5 className="description-heading">Product Description :</h5>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        </div>

        <hr className="my-5" />
        <div className="you-may-also-like">
          <h2 className="mb-4">You May Also Like</h2>
         
<div className="row">
  {recommendations.map((p) => (
    <div className="col-md-3" key={p.slug}>
      <Link to={`/bread/${p.slug}`} className="text-decoration-none text-dark">
        <img src={p.image} alt={p.name} className="img-fluid rounded mb-2" />
        <h6>{p.name}</h6>
        <p>₹{p.price}</p>
      </Link>
    </div>
  ))}
</div>
        </div>
      </div>
      <Footer />
    </>
  );
};
