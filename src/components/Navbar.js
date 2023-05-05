import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import FilterCategory from './FilterCategory';

function Navbar({ getSearch }) {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getSearch(search)
  };
  

  const handleCartClick = () => {
    // handle cart popup logic here
  };

  return (
    <nav className="navbar">
      
      <div className="navbar__logo">
        <img src="public/favicon_io (2)/android-chrome-192x192.png" alt="SokoYetu" />
      </div>
      <div className="navbar__search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search by product or category"
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        
      </div>
      <div className="navbar__cart" onClick={handleCartClick}>
        <FaShoppingCart className="navbar__cart-icon" />
        {cartItems.length > 0 && <div className="navbar__cart-count">{cartItems.length}</div>}
      </div>
    </nav>
  );
}
export default Navbar;