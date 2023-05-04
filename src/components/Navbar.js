import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav>
      <div className="logo">
        <Link to="/">SokoYetu</Link>
      </div>
      <div className="cart-icon" onClick={() => props.setCartOpen(true)}>
        <i className="fas fa-shopping-cart"></i>
        {props.cartItems > 0 && <span>{props.cartItems}</span>}
      </div>
    </nav>
  );
}

export default Navbar;
