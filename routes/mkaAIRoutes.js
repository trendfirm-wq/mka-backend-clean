const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  const question = req.body.question;

  if (!question) {
    return res.json({ answer: "No question sent." });
  }

  const HF_URL =
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

  const payload = {
    inputs: `You are MKA AI. Answer ONLY using teachings of Islam and Ahmadiyyat.\n\nQuestion: ${question}\n\nAnswer:`,
    parameters: {
      max_new_tokens: 250,
      temperature: 0.4,
    },
  };

  try {
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    const answer =
      data[0]?.generated_text ||
      data.error ||
      "⚠️ AI did not respond. Try again later.";

    return res.json({ answer });
  } catch (error) {
    return res.json({
      answer: "⚠️ Server error. MKA AI could not respond.",
      error: error.message,
    });
  }
});

module.exports = router;
