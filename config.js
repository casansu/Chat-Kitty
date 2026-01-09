require("dotenv").config();

const { OPENROUTER_API_KEY } = process.env;

if (!OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY in environment variables");
}

module.exports = { OPENROUTER_API_KEY };
