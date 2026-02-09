import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  // get old product data
  useEffect(() => {
    const getProductDetails = async () => {
      let response = await fetch(
        `http://localhost:5000/product/${params.id}`,{
           headers : {
        authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
        }
      );
      let result = await response.json();

      if (result.name) {
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
      }
    };

    getProductDetails();
  }, [params.id]);

  // update product
  const updateProduct = async () => {
    let response = await fetch(
      `http://localhost:5000/product/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
          authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
      }
    );

    let result = await response.json();
    console.warn(result);

    // go back to home / list page
    navigate("/");
  };

  return (
    <div className="add-product">
      <h1>Update Product</h1>

      <input
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button onClick={updateProduct} className="add-btn">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
