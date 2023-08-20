/* eslint-disable */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [input, setInput] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function saveToProfile() {
    const data = {
      user_email: props.user,
      saved_recommendation: recommendation,
    };
    try {
      const response = await axios.post("/api/profile", data);

      console.log("Saved successful:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  async function fetchRecommendation() {
    const data = {
      input: input,
    };
    setLoading(true);
    try {
      let res = await axios.post("/api/recommendation", data);

      setRecommendation(res.data);
      console.log("Recommendation:", res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="If you like..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={fetchRecommendation}>Tell me!</button>
      <div className="recommendation-box">
        {loading ? (
          <p>Loading...</p>
        ) : (
          recommendation && <p>{recommendation}</p>
        )}
      </div>
      {props.user && recommendation !== "" ? (
        <>
          <button onClick={saveToProfile}>Save Recommendation</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
