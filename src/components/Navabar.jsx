import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/articles">Articles</Link>
      </li>
    </ul>
  );
}
