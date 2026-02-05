import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();

    if (result) {
      alert("Product Deleted");
      getProducts(); // ✅ refresh list
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>

      <ul>
        <li className="header">Sr No.</li>
        <li className="header">Name</li>
        <li className="header">Price</li>
        <li className="header">Category</li>
        <li className="header">Company</li>
        <li className="header">Operation</li>
      </ul>

      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>₹ {item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button
              className="delete-btn"
              onClick={() => deleteProduct(item._id)}
            >
              Delete
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
