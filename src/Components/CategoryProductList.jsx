import CategoryProductCard from "./CategoryProductCard";
import "./CategoryProductList.css";

export const CategoryProductList = ({ products }) => {
  return (
    <div className="category-product-grid">
      {products.map((product, index) => (
        <CategoryProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default CategoryProductList;
