/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      console.log("Signup successful:", response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <p> Registration Form </p>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
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
