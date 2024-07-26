import React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carousel3 from "../../img/carousel3.png";

const CarouselPage = () => {
  return (
    <Carousel>
      <div>
        <img src="carousel1" />
        <p className="legend">Image 1</p>
      </div>
      <div>
        <img src="carousel2" />
        <p className="legend">Image 2</p>
      </div>
      <div>
        <img src={carousel3} alt=""/>
        <p className="legend">Image 3</p>
      </div>
    </Carousel>
  );
};

export default CarouselPage;
