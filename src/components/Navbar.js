import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';


function Navbar() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    //handle search logic
  };
  

  const handleCartClick = () => {
    // handle cart popup logic here
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="" alt="Sokoyetu" />
      </div>
      <form className="navbar__search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by product or category"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="navbar__cart" onClick={handleCartClick}>
        <FaShoppingCart className="navbar__cart-icon" />
        {cartItems.length > 0 && <div className="navbar__cart-count">{cartItems.length}</div>}
      </div>
    </nav>
  );
}

export default Navbar;
