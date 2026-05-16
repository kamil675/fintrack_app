import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Toaster position="top-right" />

      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
