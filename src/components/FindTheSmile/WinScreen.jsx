import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGameProgress } from "../../contexts/GameProgressContext";
import { formatTime } from "../../helpers/formatTime";

import "./WinScreen.css";

const WinScreen = () => {
  const { resetFindTheSmileProgress } = useGameProgress();
  const [finalTime, setFinalTime] = useState(null);

  useEffect(() => {
    const savedTime = localStorage.getItem("findTheSmileLastTotalTime");
    if (savedTime) {
      setFinalTime(parseInt(savedTime, 10));
    }
  }, []);

  const resetProgress = () => {
    resetFindTheSmileProgress();
  };

  return (
    <div className="win-screen-container">
      <div className="win-emoji">🎉</div>
      <h1>You Win!</h1>
      <p>Amazing! You found all the smiles!</p>
      {finalTime !== null && (
        <p className="final-time-display">
          Your total time: {formatTime(finalTime)}
        </p>
      )}
      <div className="win-screen-actions">
        <Link
          to="/find-the-smile"
          onClick={resetProgress}
          className="win-button"
        >
          Play Again
        </Link>
        <Link to="/" onClick={resetProgress} className="win-button secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default WinScreen;
