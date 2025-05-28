import "./LiveProducts.css";

import {Navigation} from "../Components/Navigation";
import {Footer} from "../Components/Footer";
import { FeaturedProducts } from "../Components/FeaturedProducts";
import { products } from "../data/products";

 

export const LiveProducts = () => {
    return(
        <>
       <Navigation />

       <div className="live-products-header">
        <h2>Live Products</h2>
       </div>

      <FeaturedProducts products={products} showTitle={false} />


       <Footer/>

       </>
    );
}