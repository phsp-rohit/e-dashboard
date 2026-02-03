import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/sign_up');
  };

  return (
    <ul className="nav-ul">
      <li><Link to="/">Products</Link></li>
      <li><Link to="/add">Add Product</Link></li>
      <li><Link to="/update">Update Product</Link></li>
      <li><Link to="/profile">Profile</Link></li>

      {auth ? <li> <Link onClick={logout}>Logout</Link></li> :
       <li><Link to="/sign_up">Sign Up</Link></li>
      }
    </ul>
  );
};

export default Nav;
