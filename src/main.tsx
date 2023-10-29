import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GeneralProvider } from "./contexts/GeneralContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GeneralProvider>
    <App />
  </GeneralProvider>
);
