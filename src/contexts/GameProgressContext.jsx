import { createContext, useState, useContext, useEffect } from "react";

const GameProgressContext = createContext();

export const useGameProgress = () => useContext(GameProgressContext);

export const GameProgressProvider = ({ children }) => {
  const [findTheSmileLevel, setFindTheSmileLevel] = useState(() => {
    return parseInt(localStorage.getItem("findTheSmileLevel") || "1");
  });
  const [snakeHighScore, setSnakeHighScore] = useState(() => {
    return parseInt(localStorage.getItem("snakeHighScore") || "0");
  });
  const MAX_LEVELS = 8;

  useEffect(() => {
    localStorage.setItem("findTheSmileLevel", findTheSmileLevel.toString());
  }, [findTheSmileLevel]);

  useEffect(() => {
    localStorage.setItem("snakeHighScore", snakeHighScore.toString());
  }, [snakeHighScore]);

  const updateFindTheSmileLevel = () => {
    setFindTheSmileLevel((prev) => prev + 1);
  };

  const resetFindTheSmileProgress = () => {
    setFindTheSmileLevel(1); // Reset to level 1
  };

  const updateSnakeHighScore = (score) => {
    if (score > snakeHighScore) {
      setSnakeHighScore(score);
    }
  };

  return (
    <GameProgressContext.Provider
      value={{
        findTheSmileLevel,
        updateFindTheSmileLevel,
        resetFindTheSmileProgress,
        snakeHighScore,
        updateSnakeHighScore,
        MAX_LEVELS,
      }}
    >
      {children}
    </GameProgressContext.Provider>
  );
};
