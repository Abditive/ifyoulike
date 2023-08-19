/* eslint-disable */

import { Link, useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  function logOutRedirect() {
    props.onLogout();
    navigate("/");
  }
  return (
    <header>
      <nav>
        <h1>IFYOULIKE__</h1>
        <ul>
          <Link to="/">
            <button>Give me a recommendation!</button>
          </Link>

          {props.user ? (
            <>
              <p>Welcome back, {props.user}</p>
              <button onClick={logOutRedirect}>Log Out </button>
              <Link to="/profile">
                <button>Profile</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button>Log In</button>
              </Link>
              <Link to="/signup">
                <button> Sign Up</button>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
