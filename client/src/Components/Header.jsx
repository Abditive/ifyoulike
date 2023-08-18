/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";

function Header(props) {
  return (
    <header>
      <h1>My Website</h1>
      <nav>
        <ul>
          <li>Hello {props.user}</li>

          <button onClick={props.onLogout}>Log Out </button>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
