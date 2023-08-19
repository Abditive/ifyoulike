/* eslint-disable */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/api/users", data);
      navigate("/login");
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="registration-form">
      <h2> Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter a valid username"
        />
        <label>email</label>
        <input type="text" onChange={handleEmailChange} />
        <label>password</label>
        <input type="text" onChange={handlePassChange} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SignUpForm;
