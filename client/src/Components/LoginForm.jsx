/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/api/session", data);
      props.onLogin(data.email);
      console.log("Log In successful:", response.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  return (
    <div>
      <p> Login Form </p>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input type="text" onChange={handleEmailChange} />
        <label>password</label>
        <input type="text" onChange={handlePassChange} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginForm;
