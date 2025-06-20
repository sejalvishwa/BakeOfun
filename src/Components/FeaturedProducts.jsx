import "./FeaturedProducts.css";
import { Link } from "react-router-dom";
import { config } from "../config/config.js"; // adjust the path if needed

export const FeaturedProducts = ({
  products,
  showTitle = true,
  showPrice = false,
}) => {
  return (
    <div className="featured-products">
      {showTitle && <h1>Featured Products</h1>}
      <div className="product-container">
        {products.map((product, index) => (
          <Link
            to={`/product/${product.slug}`}
            key={index}
            className="product-wrapper"
          >
            <div className="product-card">
              <img
                src={
                  product.images && product.images.length > 0
                    ? `${product.images[0]}`
                    : "/placeholder.png"
                }
                alt={product.name}
              />
            </div>
            <div className="product-info-website">
              <p className="product-name-website">{product.name}</p>
              {showPrice && (
                <p className="product-price-website">₹{product.price}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
