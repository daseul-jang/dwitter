import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "css/navbar.css";

function Nav({ userObj }) {
  return (
    <nav>
      <ul className="nav__ul">
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faTwitter} color="#04AAFF" size="2x" />
          </Link>
        </li>
        <li>
          <Link className="nav__link" to="/profile">
            <FontAwesomeIcon icon={faUser} color="#04AAFF" size="2x" />
            <span>{userObj.displayName}의 Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
