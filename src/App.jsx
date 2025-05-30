import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage"; // Optional: could be a welcome page
import FindTheSmileGame from "./pages/FindTheSmileGame";
import SnakeGame from "./pages/SnakeGame";
import WinScreen from "./components/FindTheSmile/WinScreen"; // Specific to FindTheSmile
import { GameProgressProvider } from "./contexts/GameProgressContext";
import WithWinRedirect from "./components/HOC/WithWinRedirect";

function App() {
  return (
    <Router>
      <GameProgressProvider>
        {<WithWinRedirect />}
        <div
          className="app-container"
          style={{
            backgroundColor: "#F0F8FF",
            minWidth: "320px",
            minHeight: "100vh",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          <Header />
          <main className="game-content" style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-the-smile" element={<FindTheSmileGame />} />
              <Route path="/find-the-smile/win" element={<WinScreen />} />
              <Route path="/snake" element={<SnakeGame />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </GameProgressProvider>
    </Router>
  );
}

export default App;
