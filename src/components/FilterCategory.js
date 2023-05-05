import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";

const FilterCategory = ({ getSearch }) => {
  const [search, setSearch] = useState("");
  function handleSubmit(e){
    e.preventDefault()
    getSearch(search)
  }
  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* <input list="data" placeholder='search by category'/>
    <datalist id='data'>
      <select name="" id="">
      <option>Laptop</option>
      <option>Smartphone</option>
      </select>
    </datalist> */}
    </div>
  );
};

export default FilterCategory;
