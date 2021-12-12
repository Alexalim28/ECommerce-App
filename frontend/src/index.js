import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reset from "./pages/Reset";
import Forgot from "./pages/Forgot";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:id" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
