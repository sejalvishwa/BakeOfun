import { useState } from "react";
import { HeaderSearchFilter } from "../Components/HeaderSearchFilter";
import { CategoryProductList } from "../Components/CategoryProductList";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";

import PremiumBread from "../assets/images/premium-bread.jpg";
import BrownBread from "../assets/images/brown-bread.jpg";
import MilkBread from "../assets/images/milk-bread.jpg";
import MultigrainBread from "../assets/images/multigrain-bread.jpg";
import PawBread from "../assets/images/paw-bread.jpg";
import FamilyBread from "../assets/images/family-bread.jpg";
import BurgerBread from "../assets/images/burger-bread.jpg";
import AttaBread from "../assets/images/atta-bread.jpg";

const initialBreadProducts = [
  { name: "Bakeofun Premium Bread", price: 45, image: PremiumBread },
  { name: "Bakeofun Brown Bread", price: 50, image: BrownBread },
  { name: "Bakeofun Milk Bread", price: 50, image: MilkBread },
  { name: "Bakeofun Multigrain Bread", price: 60, image: MultigrainBread },
  { name: "Bakeofun Paw", price: 30, image: PawBread },
  { name: "Bakeofun Family Bread", price: 70, image: FamilyBread },
  { name: "Bakeofun Til Burger Buns", price: 30, image: BurgerBread },
  { name: "Bakeofun Atta Bread", price: 55, image:AttaBread },
];

export const BreadPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProducts = initialBreadProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "nameAZ":
          return a.name.localeCompare(b.name);
        case "nameZA":
          return b.name.localeCompare(a.name);
        default:
          return 0; // recently added – keep original order
      }
    });

  return (
    <>
      <Navigation />
      <div className="p-4">
        <HeaderSearchFilter
          category="Bread & Buns"
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />
        <CategoryProductList products={filteredProducts} />
      </div>
      <Footer />
    </>
  );
};

export default BreadPage;
