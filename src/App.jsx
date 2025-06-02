import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { AboutUs } from "./Pages/AboutUs";
import { Enquries } from "./Pages/Enquries";
import { LatestNews } from "./Pages/LatestNews";
import { LiveProducts } from "./Pages/LiveProducts";
import { ProductDetail } from "./Pages/ProductDetail";
import {BreadPage} from "./Pages/BreadPage";
import {NewsDetails} from "./Components/NewsDetails";


import {FloatingSocialIcons} from "./Components/FloatingSocialIcons";

export const App = () => {
  return (
    <Router>
      <FloatingSocialIcons />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/liveproducts" element={<LiveProducts />} />
        <Route path="/enquries" element={<Enquries />} />
        <Route path="/latestnews" element={<LatestNews />} />
         <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/bread" element={<BreadPage />} />
         <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
