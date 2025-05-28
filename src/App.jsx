// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage"; // Optional: could be a welcome page
import FindTheSmileGame from "./pages/FindTheSmileGame";
import SnakeGame from "./pages/SnakeGame";
import WinScreen from "./components/FindTheSmile/WinScreen"; // Specific to FindTheSmile

function App() {
  return (
    <Router>
      <div
        className="app-container"
        style={{
          backgroundColor: "#F0F8FF",
          minHeight: "100vh",
          fontFamily: "Nunito, sans-serif",
        }}
      >
        <Header />
        <main className="game-content" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Or default to FindTheSmile */}
            <Route path="/find-the-smile" element={<FindTheSmileGame />} />
            <Route path="/find-the-smile/win" element={<WinScreen />} />
            <Route path="/snake" element={<SnakeGame />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
