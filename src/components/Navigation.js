import React from 'react';
import { NavLink } from "react-router-dom";
class Navigation extends React.Component {
  render () {
    return (
      <nav className="site-navigation">
        <ul className="menu menu--primary">
          <li className="menu__item"><NavLink to="/grid">Grid</NavLink></li>
          <li className="menu__item"><NavLink to="/kanban">Kanban</NavLink></li>
          <li className="menu__item"><NavLink to="/cleanup">Cleanup</NavLink></li>
        </ul>
        <ul className="menu menu--secondary">
          <li className="menu__item"><NavLink to="/config">Settings and Data</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;