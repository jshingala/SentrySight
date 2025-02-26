import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // We'll create this below
import "./index.css";   // Optional global CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
