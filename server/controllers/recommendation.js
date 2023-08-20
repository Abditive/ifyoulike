const OpenAI = require("openai");
const express = require("express");
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.VITE_API_KEY,
});

router.post("/", async (request, response) => {
  try {
    console.log("input is blah2" + request.body.input);
    let input = request.body.input;
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
    console.log(
      `this is the response2:${chatCompletion.choices[0].message.content}`
    );
    return response.json(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error2:", error);
  }
});

module.exports = router;
