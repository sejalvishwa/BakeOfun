// components/CategoryProductList.jsx
import "./CategoryProductList.css";

export const CategoryProductList = ({ products }) => {
  return (
    <div className="category-product-list">
      {products.map((product, index) => (
        <div className="product-card-category" key={index}>
          <img src={product.image} alt={product.name} className="product-image-category" />
          <h3 className="product-name-website-category">{product.name}</h3>
          <p className="product-price-website-category">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
};
