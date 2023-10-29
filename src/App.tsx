import axios from "axios";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GeneralProvider } from "./contexts/GeneralContext";
import MainPage from "./pages/MainPage";
import { sendGrammarCheckRequest } from "./services/grammarCheck";
function App() {

  return (
    <>
      <div className="app-con h-screen w-full  flex-center-center">
        <MainPage />
      </div>
    </>
  );
}

export default App;
