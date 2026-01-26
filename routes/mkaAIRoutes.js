const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// POST /api/mkaai
router.post("/", async (req, res) => {
  const question = req.body.question;

  if (!question) {
    return res.json({ answer: "No question sent." });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct", // free, powerful model
        messages: [
          {
            role: "system",
            content:
              "You are MKA AI, created for Majlis Khuddam-ul-Ahmadiyya Ghana. " +
              "Answer strictly based on Islam and Ahmadiyyat teachings. " +
              "Be respectful, accurate, and clear.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices[0].message.content) {
      return res.json({ answer: data.choices[0].message.content });
    } else {
      return res.json({
        answer: "⚠️ AI did not return any response.",
        raw: data,
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({
      answer: "⚠️ Server error. MKA AI could not connect.",
      error: error.message,
    });
  }
});

module.exports = router;
