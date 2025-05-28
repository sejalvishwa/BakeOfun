import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import "./Carousel.css";

export const Carousel = ({ slides }) => {
  const settings = {
 dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img src={slide} alt={`slide-${index}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
