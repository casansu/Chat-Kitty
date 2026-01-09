console.log("main.js loaded");

const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

function sendMessage() {
    /*
        Remove extra space aka trim
        Do nothing if input is empty
        Display user's message
        Call OpenAI API to get chatbot's response
        Clear user input
    */
    console.log("sendMessage called");
    const message = userInput.value.trim();

    if (!message) return;
    
    displayMessage('user', message);
    getChatbotResponse(message);

    userInput.value = '';
}

function displayMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);

  const content = document.createElement('div');
  content.classList.add('message-content');

  if (sender === 'chatbot') {
    // Render markdown -> HTML and sanitize it
    const rawHtml = marked.parse(message);
    const safeHtml = DOMPurify.sanitize(rawHtml);
    content.innerHTML = safeHtml;
  } else {
    // User text should never be treated as HTML
    content.textContent = message;
  }

  msgDiv.appendChild(content);
  chatLog.appendChild(msgDiv);

  // Optional: auto-scroll to newest message
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function getChatbotResponse(userMessage) {
  try {
    console.log("About to fetch /getChatbotResponse with:", userMessage);

    const response = await fetch('/getChatbotResponse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage }),
    });

    console.log("Fetch finished. Status:", response.status);

    const data = await response.json();
    console.log("Data from server:", data);
    displayMessage('chatbot', data.reply);
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}