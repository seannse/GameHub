// pages/FindTheSmileGame.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FindTheSmileGame.css"; // For styling

const MAX_LEVELS = 8;
const SAD_FACE = "😞";
const SMILEY_FACE = "😊";

// Helper to generate grid
const generateGrid = (level) => {
  const gridSize = level + 1; // e.g., Level 1: 2x2, Level 2: 3x3, Level 3: 4x4
  const totalCells = gridSize * gridSize;
  const smileyPosition = Math.floor(Math.random() * totalCells);
  const newGrid = Array(totalCells).fill(SAD_FACE);
  newGrid[smileyPosition] = SMILEY_FACE;
  return { cells: newGrid, smileyIndex: smileyPosition, columns: gridSize };
};

const FindTheSmileGame = () => {
  const [level, setLevel] = useState(1);
  const [gridData, setGridData] = useState(generateGrid(level));
  const [message, setMessage] = useState("Find the smiling face!");
  const navigate = useNavigate();

  useEffect(() => {
    // Reset grid when level changes
    setGridData(generateGrid(level));
    setMessage(`Level ${level}: Find the smiling face!`);
  }, [level]);

  const handleFaceClick = (index) => {
    if (index === gridData.smileyIndex) {
      if (level < MAX_LEVELS) {
        setLevel((prevLevel) => prevLevel + 1);
        // You'd update saved progress here (e.g., in localStorage or context)
      } else {
        navigate("/find-the-smile/win");
      }
    } else {
      setMessage("Oops, try again!");
      // Optional: add a little shake animation to the clicked sad face
    }
  };

  const resetGame = () => {
    setLevel(1);
    // Reset saved progress if desired
  };

  return (
    <div className="find-smile-container">
      <h2>Find the Smiling Face!</h2>
      <p className="level-indicator">
        Level: {level} / {MAX_LEVELS}
      </p>
      <p className="game-message">{message}</p>
      <div
        className="face-grid"
        style={{ gridTemplateColumns: `repeat(${gridData.columns}, 1fr)` }}
      >
        {gridData.cells.map((face, index) => (
          <button
            key={index}
            className="face-cell"
            onClick={() => handleFaceClick(index)}
            aria-label={face === SMILEY_FACE ? "Smiling face" : "Sad face"}
          >
            {face}
          </button>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">
        Reset Game
      </button>
      {/* Placeholder for score/timer */}
      <div className="game-stats">
        <p>Time: 00:00</p> {/* Implement timer logic */}
      </div>
    </div>
  );
};

export default FindTheSmileGame;
