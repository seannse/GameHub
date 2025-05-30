import { useState, useEffect, useCallback } from "react";
import { useGameProgress } from "../contexts/GameProgressContext"; // Import context hook
import { formatTime } from "../helpers/formatTime";
import "./FindTheSmileGame.css";
import WithWinRedirect from "../components/HOC/WithWinRedirect";

const SAD_FACE = "😞";
const SMILEY_FACE = "😊";

const generateGrid = (level) => {
  const columns = Math.min(level + 1, 5); // Cap grid size for very high levels, e.g. Level 1: 2x2
  const totalCells = columns * columns;
  const smileyIndex = Math.floor(Math.random() * totalCells);
  const cells = Array(totalCells).fill(SAD_FACE);
  cells[smileyIndex] = SMILEY_FACE;
  return { cells, smileyIndex, columns };
};

const FindTheSmileGame = () => {
  const {
    findTheSmileLevel,
    updateFindTheSmileLevel,
    resetFindTheSmileProgress,
    MAX_LEVELS,
  } = useGameProgress();

  const [gridData, setGridData] = useState(generateGrid(findTheSmileLevel));
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Sync state on level change
  useEffect(() => {
    const levelToDisplay = Math.min(MAX_LEVELS, findTheSmileLevel);
    setGridData(generateGrid(levelToDisplay));
    setMessage(`Level ${levelToDisplay}: Find the smiling face!`);
    setTimer(
      parseInt(localStorage.getItem("findTheSmileLastTotalTime", 10)) ?? 0
    );

    if (findTheSmileLevel > MAX_LEVELS) {
      setIsTimerActive(false); // Stop timer if game is won
    } else {
      if (findTheSmileLevel === 1) {
        setTimer(0);
      }
      setIsTimerActive(true);
    }
  }, [findTheSmileLevel, MAX_LEVELS]); // React to changes in global level from context

  // Save timer to localStorage
  useEffect(() => {
    if (isTimerActive)
      localStorage.setItem("findTheSmileLastTotalTime", timer.toString());
  }, [isTimerActive, timer]);

  // Timer tick logic
  useEffect(() => {
    let intervalId;
    if (!isTimerActive) return;

    intervalId = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerActive]);

  const handleFaceClick = useCallback(
    (index, event) => {
      if (index === gridData.smileyIndex) {
        updateFindTheSmileLevel();
      } else {
        setMessage("Oops, try again!");
        const clickedCell = event.target.closest(".face-cell"); // Get the button element
        if (clickedCell) {
          clickedCell.classList.add("shaking");
          setTimeout(() => {
            clickedCell.classList.remove("shaking");
          }, 500); // Duration of shake animation
        }

        if (!isTimerActive && !(findTheSmileLevel > MAX_LEVELS)) {
          setIsTimerActive(true);
        }
      }
    },
    [
      gridData.smileyIndex,
      updateFindTheSmileLevel,
      isTimerActive,
      findTheSmileLevel,
      MAX_LEVELS,
    ]
  );

  const resetGame = () => {
    setTimer(0);
    localStorage.removeItem("findTheSmileLastTotalTime");
    resetFindTheSmileProgress(); // Reset level to 1
  };

  return (
    <div className="find-smile-container">
      <h2>Find the Smiling Face!</h2>
      <div className="game-info">
        <p className="level-indicator">
          Level: {Math.min(findTheSmileLevel, MAX_LEVELS)} / {MAX_LEVELS}
        </p>
        <p className="timer-display">Time: {formatTime(timer)}</p>
      </div>
      <p className="game-message">{message}</p>
      <div
        className="face-grid"
        style={{ gridTemplateColumns: `repeat(${gridData.columns}, 1fr)` }}
      >
        {gridData.cells.map((face, index) => (
          <button
            key={index}
            className="face-cell"
            onClick={(e) => handleFaceClick(index, e)} // Pass event for shake
            aria-label={face === SMILEY_FACE ? "Smiling face" : "Sad face"}
          >
            {face}
          </button>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">
        Reset Game
      </button>
    </div>
  );
};

export default WithWinRedirect(FindTheSmileGame, "/find-the-smile/win");
