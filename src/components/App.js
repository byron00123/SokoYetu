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
  const [productId, setProductId] = useState(null);

  const images = [
    "https://cdn11.bigcommerce.com/s-tr29lmokh7/images/stencil/1280x1280/t/small%20&%20medium%20businesses__48495.original.png",
    "https://helios-i.mashable.com/imagery/articles/07DeWDE6dmQkbeM3YHBrhgg/hero-image.fill.size_1200x900.v1638551902.jpg",
    "https://fdn.gsmarena.com/imgroot/news/19/03/xiaomi-redmi-note-7-india-sale/-727/gsmarena_002.jpg",
    "https://9to5google.com/wp-content/uploads/sites/4/2021/11/zte-black-friday-flash-sale.jpg?quality=82&strip=all",
    "https://cdn.sparkfun.com/assets/home_page_posts/4/0/6/9/flash-sale-extended.jpg",
    "https://image01.realme.net/general/20230315/1678865253062.jpg.webp?width=1080&height=550",
    "https://dynamic.brandcrowd.com/template/preview/design/2398ae7c-a024-42bf-96b2-89321a313052?v=4&designTemplateVersion=1&size=design-preview-standalone-1x",
    "https://i.pcmag.com/imagery/articles/01HDNMQBGe18RyEDhRdBYKd-1..v1666039629.png",
    
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
  const filterProducts = (searchTerm) => {
    const filtered = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category.toLowerCase();
      const term = searchTerm.toLowerCase();
      return productName.includes(term) || productCategory.includes(term);
    });
    setFilteredProducts(filtered);
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
        

        <AddProduct />
        <UpdateProduct productId={productId} />

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
