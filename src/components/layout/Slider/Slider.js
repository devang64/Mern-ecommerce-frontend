import React, { useState } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import './Slider.css';
function Sliders() {
  const imgs = [
    'https://www.boat-lifestyle.com/cdn/shop/files/LNT_WEB_1440x.jpg?v=1698230264',
    'https://www.boat-lifestyle.com/cdn/shop/files/Wave_Elevate_Pro_Banner_WEB_1440x.jpg?v=1697195756',
    'https://www.boat-lifestyle.com/cdn/shop/files/Desktop_3416514a-87f6-4562-bde3-420528f42d9f_1440x.jpg?v=1696856402',
  ];
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const settings = {
    initialSlide: 0,
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const renderSlides = imgs.map((num) => (
    <div className={"navlink-slider"}>
      <img className="trending-img" key={num} src={num} alt="" />
    </div>
  ));

  return (
    <section className="center slider">
      <div>
        <Slider {...settings}>{renderSlides}</Slider>
      </div>
    </section>
  );
}

export default Sliders;
