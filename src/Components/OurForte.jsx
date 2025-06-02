import { ThumbsUp, Heart, Star, Shield } from "lucide-react";
import "./OurForte.css"; 

export const OurForte = ()  => {
  const features = [
    {
      icon: ThumbsUp,
      title: "QUALITY",
      description:
        "Handpicked ingredients to compliment purity & taste. Top Notch packaging for optimum shelf life",
      gradientClass: "blue-gradient",
    },
    {
      icon: Heart,
      title: "HYGIENE",
      description:
        "FSSAI ISO 22000, HACCP Compliant Plant & Operations",
      gradientClass: "rose-gradient",
    },
    {
      icon: Star,
      title: "TASTE",
      description:
        "A wide gamut of tantalizing flavors offered for every palate. Right blend of a variety of Quality Dry Fruit & Nuts",
      gradientClass: "amber-gradient",
    },
    {
      icon: Shield,
      title: "HEALTH",
      description:
        "Nutritionally sound products with cautious amount of Salt, Sugar & additives",
      gradientClass: "emerald-gradient",
    },
  ];

  return (
    <section className="why-choose-us-section">
      <div className="container">
        <div className="header">
          <h2>Why Choose Our Products</h2>
          <p>
            Discover the four pillars that make our products exceptional and trusted by customers worldwide.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div className="feature-card" key={index}>
                <div className={`icon-wrapper ${feature.gradientClass}`}>
                  <Icon size={32} color="#fff" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className={`corner-deco ${feature.gradientClass}`}></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default OurForte;