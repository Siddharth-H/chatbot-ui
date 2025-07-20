import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setChat(prev => [...prev, userMsg]);
    setInput("");

    try {
      const { data } = await axios.post(`${API_URL}/chat`, { message: input });
      const botMsg = { sender: "bot", text: data.reply };
      setChat(prev => [...prev, botMsg]);
    } catch (error) {
      setChat(prev => [...prev, { sender: "bot", text: "⚠️ Error: " + error.message }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">💬 AI Chatbot</h2>
      <div className="chat-window">
        {chat.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-row">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
