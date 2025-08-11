import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatMessagesRef = useRef(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { sender: "user", text: message }]);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const botResponse = data.response || "No response received.";
      setChatHistory((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Error communicating with the chatbot." },
      ]);
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div>
      {!isOpen && (
        <button className="chat-icon" onClick={() => setIsOpen(true)}>
          <img src="/live-chat.png" alt="Chat Icon" className="chat-image" />
        </button>
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h2>BloodHelp</h2>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chat-messages" ref={chatMessagesRef}>
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="textarea-container">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows={1}
            />
            <button onClick={handleSend} className="send-btn">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
