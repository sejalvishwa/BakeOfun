import "./LiveProducts.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import { FeaturedProducts } from "../Components/FeaturedProducts";
import { config } from "../config/config.js";

export const LiveProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}/api/live-products`
        );
        const productData = response.data.data;
        const dataArray = Array.isArray(productData)
          ? productData
          : [productData];
        // Only keep products that are marked as active
        const activeProducts = dataArray.filter((p) => p.isActive);
        setProducts(activeProducts);
        console.log("Website Live Products:", activeProducts);
      } catch (error) {
        console.error("Error fetching live products:", error);
        setProducts([]);
      }
    };

    fetchLiveProducts();
  }, []);

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

      {products.length > 0 ? (
        <FeaturedProducts
          products={products}
          showTitle={false}
          showPrice={true}
        />
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#888" }}>
          No live products available.
        </p>
      )}

      <Footer />
    </>
  );
};
