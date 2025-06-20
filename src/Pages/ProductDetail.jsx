import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import { FeaturedProducts } from "../Components/FeaturedProducts";
import { config } from "../config/config";
import zomatoLogo from "../assets/images/zomato_logo.png";
import swiggyLogo from "../assets/images/swiggy_logo.png";
import { FiShare2 } from "react-icons/fi";

export const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}/api/live-products`
        );
        const all = response.data.data;
        const active = all.filter((p) => p.isActive);
        const matchedProduct = active.find((p) => p.slug === slug);

        setProduct(matchedProduct);
        setAllProducts(active);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return <p className="text-center mt-5">Product not found.</p>;
  }

  const recommendations = allProducts
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  return (
    <>
      <Navigation />

      <div className="container my-5">
        <div className="row align-items-start">
          {/* Product Image */}
          <div className="col-md-6 mb-4 zoom-container">
            <img
              src={`${product.images[0]}`}
              alt={product.name}
              className="img-fluid rounded zoom-on-hover"
              style={{
                maxWidth: "70%",
                height: "auto",
                cursor: "zoom-in",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>

          {/* Product Info */}
          <div className="col-md-6 product-info">
            <div className="product-header">
              <h2>{product.name}</h2>
              <p className="price">₹{product.price}</p>
            </div>

            <div className="share-section-project">
              <button> <FiShare2 size={18} /></button>
            </div>

            <div className="availability mt-4">
              <h5>Available on:</h5>
              <div className="platform-logos">
                {product.deliveryPlatforms.map((platform, idx) => (
                  <a
                    key={idx}
                    href={platform.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`${platform.logo}`}
                      alt={platform.name}
                      style={{ marginRight: "10px" }}
                    />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <a href="/enquries" className="bulk-enquiry">
                Bulk Enquiry
              </a>
            </div>

            <div className="product-description-section mt-5 ">
              <h5 className="description-heading">Product Description :</h5>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <hr className="my-5" />
        <div className="you-may-also-like">
          <h2 className="mb-4">You May Also Like</h2>
          <FeaturedProducts
            products={recommendations}
            showTitle={false}
            showPrice={true}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};
