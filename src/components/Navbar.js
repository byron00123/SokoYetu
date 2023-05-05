// import React, { useState } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';


// function Navbar() {
//   const [cartItems, setCartItems] = useState([]);
//   const [search, setSearch] = useState("");

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // handle search logic here
//     getSearch(search)
//   };

//   const handleCartClick = () => {
//     // handle cart popup logic here
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">
//         <img src="" alt="Sokoyetu" />
//       </div>
//       <form className="navbar__search" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Search by product or category"
//           value={search}
//           onChange={(event)=>setSearch(event.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//       <div className="navbar__cart" onClick={handleCartClick}>
//         <FaShoppingCart className="navbar__cart-icon" />
//         {cartItems.length > 0 && <div className="navbar__cart-count">{cartItems.length}</div>}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import FilterCategory from './FilterCategory';

function Navbar({ getSearch }) {
  const [cartItems, setCartItems] = useState([]);
<<<<<<< HEAD
  const [search, setSearch] = useState("");
=======
  const [searchTerm, setSearchTerm] = useState('');
  
>>>>>>> refs/remotes/origin/main

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

<<<<<<< HEAD
  // const getSearch = (searchValue) => {
  //   // handle search logic here

  // };


  const handleSubmit = (event) => {
    event.preventDefault();
    getSearch(search)
=======
  const handleSearchSubmit = (event) => {
    //handle search logic
>>>>>>> refs/remotes/origin/main
  };
  

  const handleCartClick = () => {
    // handle cart popup logic here
  };

  return (
    <nav className="navbar">
      
      <div className="navbar__logo">
        <img src="public/logo192.png" alt="Sokoyetu" />
      </div>
      {/* <form className="navbar__search" onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Search by product or category"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form> */}
      <div className="navbar__cart" onClick={handleCartClick}>
        <FaShoppingCart className="navbar__cart-icon" />
        {cartItems.length > 0 && <div className="navbar__cart-count">{cartItems.length}</div>}
      </div>
    </nav>
  );
}

export default Navbar;
