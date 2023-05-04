import React from 'react';

function AddFavourites(props) {
  return (
    <button className="add-favourites" onClick={props.onClick}>
      <i className="fas fa-heart"></i>
    </button>
  );
}

export default AddFavourites;
