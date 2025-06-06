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
  {
    name: "Bakeofun Premium Bread",
    price: 45,
    image: PremiumBread,
    slug: "premium-bread",
    description: "Soft and fluffy white bread perfect for sandwiches.",
  },
  {
    name: "Bakeofun Brown Bread",
    price: 50,
    image: BrownBread,
    slug: "brown-bread",
    description: "Healthier brown bread rich in fiber and nutrients.",
  },
  {
    name: "Bakeofun Milk Bread",
    price: 50,
    image: MilkBread,
    slug: "milk-bread",
    description: "Sweet and soft milk bread ideal for toasts and snacks.",
  },
  {
    name: "Bakeofun Multigrain Bread",
    price: 60,
    image: MultigrainBread,
    slug: "multigrain-bread",
    description: "Made with multiple grains, a healthy choice for breakfast.",
  },
  {
    name: "Bakeofun Paw",
    price: 30,
    image: PawBread,
    slug: "paw-bread",
    description: "Mini paw-shaped bread, soft and perfect for kids.",
  },
  {
    name: "Bakeofun Family Bread",
    price: 70,
    image: FamilyBread,
    slug: "family-bread",
    description: "Larger loaf suitable for family meals.",
  },
  {
    name: "Bakeofun Til Burger Buns",
    price: 30,
    image: BurgerBread,
    slug: "til-burger-buns",
    description: "Soft burger buns topped with sesame seeds.",
  },
  {
    name: "Bakeofun Atta Bread",
    price: 55,
    image: AttaBread,
    slug: "atta-bread",
    description: "Whole wheat atta bread for a nutritious meal.",
  },
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
;
export { initialBreadProducts };
export default BreadPage;
