// components/Header.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css"; // For styling

const Header = () => {
  // Placeholder for score/progress - could come from context or props
  const userProgress = { findTheSmileLevel: 1, snakeHighScore: 0 };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        😊 GameHub
      </Link>
      <nav>
        <NavLink to="/find-the-smile">Find the Smile</NavLink>
        <NavLink to="/snake">Snake</NavLink>
      </nav>
      <div className="user-progress">
        {/* Placeholder for score/saved progress */}
        <span>Smile Lvl: {userProgress.findTheSmileLevel}</span>
        <span>Snake HS: {userProgress.snakeHighScore}</span>
      </div>
    </header>
  );
};

export default Header;
