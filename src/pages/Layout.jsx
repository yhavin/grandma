import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout =() => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
};

export default Layout;