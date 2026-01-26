const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/", async (req, res) => {
  const question = req.body.question;
  if (!question) {
    return res.json({ answer: "No question sent." });
  }

  const HF_API_URL =
    "https://router.huggingface.co/hf-inference/mistralai/Mistral-7B-Instruct-v0.2";

  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `You are MKA AI. Answer with Islamic and Ahmadiyya teachings.\n\nQuestion: ${question}\n\nAnswer:`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.4,
        },
      }),
    });

    const data = await response.json();

    if (data.generated_text) {
      return res.json({ answer: data.generated_text });
    } else {
      return res.json({
        answer: "⚠️ Model returned no text.",
        raw: data,
      });
    }
  } catch (err) {
    console.error(err);
    return res.json({
      answer: "⚠️ Server error. MKA AI could not respond.",
      error: err.message,
    });
  }
});

module.exports = router;
