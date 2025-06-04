import { useState } from 'react'
import axios from "axios";
import "./App.css"


function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:5001/chat", {
        message: input,
      });

      const botMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      alert("Error contacting chatbot.");
    }

    setInput("");
  };

  return (
  <div className="App">
    <h1>ChatGPT Clone</h1>
    <div className="chatbox">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          {msg.content}
        </div>
      ))}
    </div>
    <div className="input-area">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);
}

export default App;