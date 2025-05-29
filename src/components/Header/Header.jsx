import { Link, NavLink } from "react-router-dom";
import { useGameProgress } from "../../contexts/GameProgressContext";

import "./Header.css"; // For styling

const Header = () => {
  const { findTheSmileLevel, snakeHighScore, MAX_LEVELS } = useGameProgress();

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
        <span>Smile Lvl: {Math.min(findTheSmileLevel, MAX_LEVELS)}</span>
        <span>Snake HS: {snakeHighScore}</span>
      </div>
    </header>
  );
};

export default Header;
