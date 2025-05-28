// pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Cheerful Game Hub! 👋</h1>
      <p>Pick a game and have some fun.</p>
      <div className="game-links">
        <Link to="/find-the-smile" className="home-game-link">
          <span role="img" aria-label="smile emoji">
            😊
          </span>{" "}
          Find the Smile
        </Link>
        <Link to="/snake" className="home-game-link">
          <span role="img" aria-label="snake emoji">
            🐍
          </span>{" "}
          Snake Game
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
