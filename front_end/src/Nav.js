import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';   // ✅ Import CSS here

const Nav = () => {
  return (
    <ul className="nav-ul">
      <li><Link to="/">Products</Link></li>
      <li><Link to="/add">Add Product</Link></li>
      <li><Link to="/update">Update Product</Link></li>
      <li><Link to="/logout">Logout</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/sign_up">Sign Up</Link></li>
    </ul>
  );
};

export default Nav;
