import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/articles">Articles</Link>
      </li>
      <li>
        <Link to="/users">Login</Link>
      </li>
    </ul>
  );
}
