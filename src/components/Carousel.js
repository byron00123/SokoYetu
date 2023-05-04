import React, { useState, useEffect } from "react";

function Carousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);

  const handlePrevClick = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  if (!images || !Array.isArray(images) || images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div className="carousel">
      <div className="carousel-image-container">
        <img src={images[currentImageIndex]} alt="" />
      </div>
      <div className="carousel-controls">
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}

export default Carousel;
