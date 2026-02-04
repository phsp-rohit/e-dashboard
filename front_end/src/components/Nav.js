import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <ul className="nav-ul">
      {/* LOGO */}
      <li className="logo-li">
        <img
          src="https://simicart.com/wp-content/uploads/eCommerce-logo.jpg"
          alt="logo"
          className="logo"
        />
      </li>

      {auth ? (
        <>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>

          <li className="nav-spacer"></li>

          <li>
            <Link onClick={logout}>Logout ({auth.name})</Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-spacer"></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </>
      )}
    </ul>
  );
};

export default Nav;
