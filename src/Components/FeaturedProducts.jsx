import "./FeaturedProducts.css";
import { Link } from "react-router-dom";

export const FeaturedProducts = ({ products, showTitle = true }) => {
  return (
    <div className="featured-products">
      {showTitle && <h1>Featured Products</h1>}
      <div className="product-container">
        {products.map((product, index) => (
          <Link to={`/product/${product.slug}`} key={index} className="product-wrapper">
            <div className="product-card">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

