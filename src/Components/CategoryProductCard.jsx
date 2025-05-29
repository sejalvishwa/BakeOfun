import "./CategoryProductCard.css";

const CategoryProductCard = ({ product }) => {
  return (
    <div className="category-product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">INR ₹{product.price}</p>
    </div>
  );
};

export default CategoryProductCard;
