import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import WordGame from "../pages/WordGame"; // Adjust the import path as needed
import MainPage from "../pages/MainPage"; // Adjust the import path as needed

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/word-game" element={<WordGame />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
