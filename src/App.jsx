import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Home } from "./Pages/Home";
import { AboutUs } from "./Pages/AboutUs";
import { Enquries } from "./Pages/Enquries";
import { LatestNews } from "./Pages/LatestNews";
import { LiveProducts } from "./Pages/LiveProducts";
import { ProductDetail } from "./Pages/ProductDetail";
import { BreadProductDetail } from "./Pages/BreadProductDetail";
import { BreadPage } from "./Pages/BreadPage";
import { NewsDetails } from "./Components/NewsDetails";
import { FloatingSocialIcons } from "./Components/FloatingSocialIcons";
import AdminApp from "./admin/App";

const FloatingIconsWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return !isAdminRoute ? <FloatingSocialIcons /> : null;
};

export const App = () => {
  return (
    <Router>
      <FloatingIconsWrapper />
      <Routes>
        {/* Admin Panel Routes - Must be before other routes */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Main Application Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/liveproducts" element={<LiveProducts />} />
        <Route path="/enquries" element={<Enquries />} />
        <Route path="/latestnews" element={<LatestNews />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/bread" element={<BreadPage />} />
        <Route path="/bread/:slug" element={<BreadProductDetail />} />
        <Route path="/news/:id" element={<NewsDetails />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
