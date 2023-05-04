import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

function Carousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8000/electronics');
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Slider {...settings}>
      {products.map(product => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
