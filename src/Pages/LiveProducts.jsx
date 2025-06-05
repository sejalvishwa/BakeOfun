import "./LiveProducts.css";

import {Navigation} from "../Components/Navigation";
import {Footer} from "../Components/Footer";
import { FeaturedProducts } from "../Components/FeaturedProducts";
import { products } from "../data/products";

 

export const LiveProducts = () => {
    return(
        <>
       <Navigation />

      <div className="live-products-header" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px", color: "#FEC107" }}>
  <h2>Live Products</h2>
</div>


      <FeaturedProducts products={products} showTitle={false} showPrice={true} />


       <Footer/>

       </>
    );
}