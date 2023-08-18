/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import Header from "./Components/Header";

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
      <Header user={username} onLogout={handleLogout}></Header>
      <SignUpForm></SignUpForm>
      <LoginForm onLogin={handleLogin}></LoginForm>
    </>
  );
}

export default App;
