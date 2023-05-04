import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";

const FilterCategory = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/electronics?category=${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, [category]);

  return <ProductList products={products} />;
};

export default FilterCategory;
