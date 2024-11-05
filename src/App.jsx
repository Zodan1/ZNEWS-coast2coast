import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      {/* <Route path="/articles" element={<Articles />} /> */}
    </Router>
  );
}

export default App;
