console.log(">>> SERVER.JS NEW VERSION LOADED <<<");

// Import the LLM provider (OpenRouter / DeepSeek adapter)
const { LLMProvider } = require("./llmProvider");

// Import dependencies
const express = require("express");
const path = require("path");

// Create Express app
const app = express();

// Use hosting port if available, otherwise default to 3000
const port = process.env.PORT || 3000;

/**
 * Middleware
 */

// Serve static frontend files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming JSON request bodies
app.use(express.json());

/**
 * Routes
 */

// Main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Chatbot endpoint called from frontend via fetch()
app.post("/getChatbotResponse", async (req, res) => {
  try {
    console.log("POST /getChatbotResponse");
    console.log("Request body:", req.body);

    const userMessage = req.body.userMessage;

    // Call the LLM provider to generate a response
    const reply = await LLMProvider.generateResponse(userMessage);

    // Always respond with JSON
    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);

    // Send JSON error instead of HTML
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

/**
 * Start server
 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
