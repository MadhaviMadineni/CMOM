import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import { CoinInfo, Coins } from "./Components";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/:id" element={<CoinInfo />} />
          <Route path="/" element={<Coins />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
