import React, { useState, useEffect, useCallback } from "react";
import { useGameProgress } from "../contexts/GameProgressContext";
import "./SnakeGame.css"; // For styling

const GRID_SIZE = 20; // 20x20 grid
const CELL_SIZE = 20; // 20px per cell

const getRandomPosition = (snakeBody = []) => {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snakeBody.some(
      (segment) => segment.x === position.x && segment.y === position.y
    )
  );
  return position;
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: 1, y: 0 }); // Moving right initially
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const { snakeHighScore, updateSnakeHighScore } = useGameProgress();

  const handleKeyDown = useCallback(
    (e) => {
      if (!gameStarted) return;
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    },
    [direction, gameStarted]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // Wall collision
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        for (let i = 1; i < newSnake.length; i++) {
          if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
            setGameOver(true);
            return prevSnake;
          }
        }

        newSnake.unshift(head); // Add new head

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 1);
          setFood(getRandomPosition(newSnake)); // Ensure new food isn't on snake
        } else {
          newSnake.pop(); // Remove tail
        }
        return newSnake;
      });
    }, 150); // Adjust speed

    return () => clearInterval(gameLoop);
  }, [snake, direction, food, gameOver, gameStarted]);

  useEffect(() => {
    if (score > 0) {
      // Only update if score is greater than 0
      updateSnakeHighScore(score); // Update context and localStorage
    }
  }, [score, updateSnakeHighScore]);

  useEffect(() => {
    if (gameOver && gameStarted) {
      // Final check for high score when game ends
      updateSnakeHighScore(score);
    }
  }, [gameOver, gameStarted, score, updateSnakeHighScore]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(getRandomPosition());
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="snake-game-container">
      <h2>Classic Snake</h2>
      <div className="score-board">
        <span>Score: {score}</span>
        <span>High Score: {snakeHighScore}</span>
      </div>
      <div
        className="game-board"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Render Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}
        {/* Render Food */}
        <div
          className="food-item"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
        {(!gameStarted || gameOver) && (
          <div className="game-overlay">
            {gameOver && <p className="game-over-text">Game Over!</p>}
            <button onClick={startGame} className="start-button">
              {gameOver ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>
      <div className="controls-info">
        <p>Use Arrow Keys to move</p>
      </div>
    </div>
  );
};

export default SnakeGame;
