import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    const userMsg = { sender: "user", text: input };
    setChat([...chat, userMsg]);

    const { data } = await axios.post("http://localhost:3001/chat", {
      message: input,
    });

    const botMsg = { sender: "bot", text: data.reply };
    setChat((prev) => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div>
      {chat.map((msg, i) => (
        <div key={i} style={{ textAlign: msg.sender === "bot" ? "left" : "right" }}>
          <p><strong>{msg.sender}:</strong> {msg.text}</p>
        </div>
      ))}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
