import React, { useState } from 'react';
import axios from 'axios';

function AddProduct(props) {
  const [product, setProduct] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://electronics-w29s.onrender.com/electronics', product)
      .then((response) => {
        if (props.addProduct) {
          props.addProduct(response.data);
        }
        setProduct({});
      })
      .catch((error) => {
        console.error('Error adding product: ', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={product.name || ''} onChange={handleInputChange} required />
      </div>
      
      <div>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" value={product.category || ''} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" min="0" value={product.quantity || ''} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" min="0" step="0.01" value={product.price || ''} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input type="url" id="imageUrl" name="imageUrl" value={product.imageUrl || ''} onChange={handleInputChange} required />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddProduct;
