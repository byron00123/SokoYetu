import React from 'react';

function Cart(props) {
  const total = props.cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {props.cart.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={() => props.checkout()}>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
