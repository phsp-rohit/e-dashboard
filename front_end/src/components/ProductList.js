import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products')
    result = await result.json();
    setProducts(result);
  };

  console.warn("products", products);

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <ul>  
        <li className="header">Sr No.</li>
        <li className="header">Name</li>
        <li className="header">Price</li>
        <li className="header">Category</li>
        <li className="header">Company</li>
      </ul>
      {
        products.map((item, index) => 
           <ul>  
        <li >{index+1}</li>
        <li>{item.name}</li>
        <li>₹ {item.price}</li>
        <li>{item.category}</li>
        <li>{item.company}</li>
      </ul>
)
      }
      
    </div>
  );
};
export default ProductList;
