import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Header from "./components/Header";
import Home from "./components/Home";
import Users from "./components/Users";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
