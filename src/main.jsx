import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css"; // This can be for global styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
