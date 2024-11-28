'use client'
import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (response.ok) {
        const botMessage = { role: "bot", content: data.reply };
        setChatHistory([...chatHistory, userMessage, botMessage]);
        setMessage("");
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", width: "100%", maxWidth: "600px", margin: "100px auto" }}>
      <h1>Chatbot</h1>
      <div style={{ marginBottom: "20px" }}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <strong>{chat.role === "user" ? "You" : "Bot"}:</strong> {chat.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{ width: "70%", marginRight: "10px" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
