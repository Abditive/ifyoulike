/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <nav>
        <h1>IFYOULIKE__</h1>
        <ul>
          {props.user ? (
            <>
              <h2>Welcome back, {props.user}</h2>
              <button onClick={props.onLogout}>Log Out </button>
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
                <button>Want to save your preferences? Sign Up</button>
              </Link>
            </>
          )}

          <NavLink to="/">
            <h4>Home</h4>
          </NavLink>
          <NavLink to="/about">
            <h4>About</h4>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
