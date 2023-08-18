/* eslint-disable */
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import Header from "./Components/Header";
import Home from "./Components/Home";

function App() {
  let [username, setUsername] = useState("");

  const handleLogout = () => {
    axios
      .delete("/api/session")
      .then(() => {
        console.log("Logged out successfully!");
        setUsername("");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };
  const handleLogin = (email) => {
    setUsername(email);
  };

  useEffect(() => {
    axios
      .get("/api/session")
      .then((response) => {
        setUsername(response.data.email);
      })
      .catch((error) => {
        setUsername("");
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header user={username} onLogout={handleLogout}></Header>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          ></Route>
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
