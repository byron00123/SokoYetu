import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Carousel from './Carousel';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import FilterCategory from './FilterCategory';
import Cart from './Cart';
import StripePayment from './StripePayment';


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/electronics')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch('http://localhost:8000/electronics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(products.map(p => p.id === id ? data : p));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/electronics/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(product => product.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div>
        <Navbar />
        
        <AddProduct />
        <UpdateProduct />
        <Routes>
          <Route path="/" element={
            <>
              <Carousel products={products} />
              <ProductList
                products={products}
                addToCart={handleAddToCart}
                deleteProduct={handleDeleteProduct}
              />
            </>
          }/>
          <Route path="/add" element={<AddProduct addProduct={handleAddProduct} />} />
          <Route path="/update/:id" element={<UpdateProduct products={products} updateProduct={handleUpdateProduct} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={handleRemoveFromCart} checkout={() => alert('Checkout not implemented yet!')} />} />
          <Route path="/payment" element={<StripePayment cart={cart} total={cart.reduce((sum, product) => sum + product.price, 0)} clearCart={handleClearCart} setError={(error) => alert(error)} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
