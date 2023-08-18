/* eslint-disable */
import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

function Home() {
  const [input, setInput] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const fetchRecommendation = async () => {
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
      console.error("Error fetching recommendation:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="If you like..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={fetchRecommendation}>Get Recommendation</button>
      {recommendation && <p>{recommendation}</p>}
    </div>
  );
}

export default Home;
