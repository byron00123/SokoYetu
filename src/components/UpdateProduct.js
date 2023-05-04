import React, { useState } from "react";

function UpdateProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    imgUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/electronics", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product updated successfully.");
          setProduct({
            name: "",
            price: "",
            category: "",
            quantity: "",
            imgUrl: "",
          });
        } else {
          alert("Error updating product.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error updating product.");
      });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image Url:
          <input
            type="text"
            name="imgUrl"
            value={product.imgUrl}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
