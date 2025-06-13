import { useState } from "react";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import { HeaderSearchFilter } from "../Components/HeaderSearchFilter";
import { CategoryProductList } from "../Components/CategoryProductList";
import { products } from "../data/products"; // Cake & pastry products

export const LiveProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Convert "INR 300.00" to number 300
  const formatPrice = (priceStr) =>
    Number(priceStr.replace("INR", "").replace(".00", "").trim());

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "priceLowHigh":
          return formatPrice(a.price) - formatPrice(b.price);
        case "priceHighLow":
          return formatPrice(b.price) - formatPrice(a.price);
        case "nameAZ":
          return a.name.localeCompare(b.name);
        case "nameZA":
          return b.name.localeCompare(a.name);
        default:
          return 0; // recent (original order)
      }
    });

  return (
    <>
      <Navigation />

      <div
        className="live-products-header"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          color: "#FEC107",
        }}
      >
        <h2>Live Products</h2>
      </div>

      <div className="p-4">
        <HeaderSearchFilter
          // category="Live Products"
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />
        <CategoryProductList products={filteredProducts} />
      </div>

      <Footer />
    </>
  );
};
