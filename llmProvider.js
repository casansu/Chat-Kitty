const { OPENROUTER_API_KEY } = require("./config");

class LLMProvider {
  static async generateResponse(userMessage) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "ChatKitty",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528:free",
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      console.log("Response from OpenRouter:", data);

      if (!response.ok) {
        const msg = data?.error?.message || data?.error || `HTTP ${response.status}`;
        return `OpenRouter error: ${msg}`;
      }

      return data.choices?.[0]?.message?.content || "No response from model";
    } catch (error) {
      console.error("OpenRouter error:", error);
      return "Sorry, something went wrong.";
    }
  }
}

module.exports = { LLMProvider };