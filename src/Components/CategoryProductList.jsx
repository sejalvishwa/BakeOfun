import { Link } from "react-router-dom";
import "./CategoryProductList.css";

export const CategoryProductList = ({ products }) => {
  return (
    <div className="category-product-list">
      {products.map((product) => (
        <Link to={`/bread/${product.slug}`} key={product.slug} className="product-card-category">
          <img src={product.image} alt={product.name} className="product-image-category" />
          <h3 className="product-name-website-category">{product.name}</h3>
          <p className="product-price-website-category">₹{product.price}</p>
        </Link>
      ))}
    </div>
  );
};
