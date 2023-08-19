/* eslint-disable */
import { useState } from "react";
import OpenAI from "openai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});

function Home(props) {
  const [input, setInput] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const navigate = useNavigate();
  async function saveToProfile() {
    console.log("saved to profile");
    const data = {
      user_email: props.user,
      saved_recommendation: recommendation,
    };
    try {
      const response = await axios.post(
        "https://ifyoulike.onrender.com/api/profile",
        data
      );

      console.log("Saved successful:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Save failed:", error);
    }
  }
  async function fetchRecommendation() {
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "if I like the book, artist, song, movie, tv show or video game. Give me a 300 character recommendation of something else I would like. if I give you a word that doesn't exist, tell me to try again. ",
          },
          {
            role: "user",
            content: input,
          },
        ],
      });
      setRecommendation(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.error("Error", error);
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
        {recommendation && <p>{recommendation}</p>}
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
