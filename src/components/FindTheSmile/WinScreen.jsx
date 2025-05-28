// components/FindTheSmile/WinScreen.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WinScreen.css";

const WinScreen = () => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    // Reset level in global state/localStorage if needed before navigating
    navigate("/find-the-smile");
  };

  return (
    <div className="win-screen-container">
      {/* Optional: Confetti animation here */}
      <div className="win-emoji">🎉</div>
      <h1>You Win!</h1>
      <p>Amazing! You found all the smiles!</p>
      <div className="win-screen-actions">
        <button onClick={handlePlayAgain} className="win-button">
          Play Again
        </button>
        <Link to="/" className="win-button secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default WinScreen;
