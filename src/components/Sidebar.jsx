import React from "react";
import { Link, Route } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Sidebar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        DailyBoard
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Quote
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/image" className="nav-link">
              Image
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/todo" className="nav-link">
              DailyGoal{" "}
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/RandomPoem" className="nav-link">
              Poem{" "}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
