import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Carousel from "./Carousel";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import FilterCategory from "./FilterCategory";
import Cart from "./Cart";
import StripePayment from "./StripePayment";
import Footer from "./Footer";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const images = [
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT01Ht1N1xgTDKoxABooeq-ivg4Vf-4sD2Gw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYroV_oFY-uC5qACO_U2ThOXz3qzLIW-IGxQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdLrNZbw00tIiSwshaC-iDpsjPnycggrprw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoO4lo9zQQn-2KU5xokMsKpbRAZqhZ675gBg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkedzP1f6C3q_hxZ3o3yd4TT5ProXACO5sBg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTYVRVW4IR8xaC0FhiWnmQVUKFsCCbPh6z8g&usqp=CAU",
  ];

  useEffect(() => {
    fetch("http://localhost:8000/electronics")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch("http://localhost:8000/electronics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        const data = await response.json();
        setProducts([...products, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async (id, product) => {
    try {
      const response = await fetch(`http://localhost:8000/electronics/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(products.map((p) => (p.id === id ? data : p)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/electronics/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // function handleDelete(id) {
  //   fetch(`http://localhost:8000/electronics/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(() => setProducts(products.filter(product => product.id !== id)))
  //     .catch(error => console.log(error));
  // }

  
  const getSearch = (search) => {
    const results = products.filter(product => product.category.toLowerCase().includes(search.toLowerCase()))
    return setProducts(results)
  }

  // const useSearch = (search) => {
  //   const [product, setProduct] = useState([]);
  //   const results = product.filter(prod => prod.category.toLowerCase().includes(search.toLowerCase()));
  //   return [results, setProduct];
  // }

  return (
    <Router>
      <div>
        <Navbar getSearch={getSearch} />
        <FilterCategory getSearch ={getSearch}/>

        <AddProduct />
        <UpdateProduct />
        <h1>FLASH SALE</h1>
        <Carousel images={images} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductList
                  products={products}
                  addToCart={handleAddToCart}
                  deleteProduct={handleDeleteProduct}
                  // handleDelete={handleDelete}
                />
              </>
            }
          />
          <Route
            path="/add"
            element={<AddProduct addProduct={handleAddProduct} />}
          />
          <Route
            path="/update/:id"
            element={
              <UpdateProduct
                products={products}
                updateProduct={handleUpdateProduct}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={handleRemoveFromCart}
                checkout={() => alert("Checkout not implemented yet!")}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <StripePayment
                cart={cart}
                total={cart.reduce((sum, product) => sum + product.price, 0)}
                clearCart={handleClearCart}
                setError={(error) => alert(error)}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
