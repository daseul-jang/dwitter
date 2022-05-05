import { Link } from "react-router-dom";

function Nav({ userObj }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
