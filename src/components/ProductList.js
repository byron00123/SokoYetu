import React, { useState, useEffect } from 'react';

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/electronics')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:8000/electronics/${id}`, {
      method: 'DELETE',
    })
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.log(error));
  }

  return (
    <div className='product-grid'>
      {products.map(productItem => (
        <div key={productItem.id} style={{ width: '50%' }}>
          <div className='product-item'>
            <img src={productItem.img} width='100%' />
            <p>
              {productItem.productname}|Kshs {productItem.price}
            </p>
            <p>
              {productItem.category}|{productItem.quantity}
            </p>
            <button className='add-to-cart' onClick={() => addToCart(productItem)}>Add To Cart</button>
            <button className='delete' onClick={() => handleDelete(productItem.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;