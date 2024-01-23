import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import IdReader from "./IdReader";
import QrCodePage from "./QrCodePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/qrcode" element={<QrCodePage />} />
        <Route path="/" element={<IdReader />} />
      </Routes>
    </Router>
  );
}
