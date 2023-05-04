import React, { useState } from "react";

function UpdateProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
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
            description: "",
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
          Description:
          <textarea
            name="description"
            value={product.description}
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
