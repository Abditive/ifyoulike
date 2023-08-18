/* eslint-disable */

import { Link, NavLink, useNavigate } from "react-router-dom";

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
          {props.user ? (
            <>
              <h2>Welcome back, {props.user}</h2>
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

          <NavLink to="/">
            <button>Get Suggestion</button>
          </NavLink>
          <NavLink to="/about">
            <button>About</button>
          </NavLink>
          <Link to="/signup">
            <button> Sign Up</button>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
