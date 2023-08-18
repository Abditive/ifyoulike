/* eslint-disable */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/api/session", data);
      props.onLogin(data.email);
      console.log("Log In successful:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Log In failed:", error);
    }
  }
  return (
    <div className="login-form">
      <h2> Login Now</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" onChange={handleEmailChange} />
        <label>Password</label>
        <input type="password" onChange={handlePassChange} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginForm;
