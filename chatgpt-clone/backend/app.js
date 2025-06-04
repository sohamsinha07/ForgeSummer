import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";

dotenv.config(); // Load environment variables

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store chat history in memory (simple implementation)
let conversation = [];

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).send({ error: "Message is required" });

  // Push user message to history
  conversation.push({ role: "user", content: message });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });

    const botReply = response.choices[0].message.content;

    // Push bot response to history
    conversation.push({ role: "assistant", content: botReply });

    res.send({ reply: botReply });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "OpenAI API error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
