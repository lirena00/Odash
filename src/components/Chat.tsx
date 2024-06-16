import { motion } from "framer-motion";
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    try {
      const response = await axios.get(
        "https://cfbackend-odash.cf-odash.workers.dev/",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            message: input,
          },
        }
      );
      const reply: Message = { text: response.data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, reply]);
      setError(null);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0, x: -20 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="h-screen w-[500px] gap-4 p-2 z-10 backdrop-blur-lg bg-black/80 flex absolute left-full"
    >
      <div className="w-full flex flex-col">
        <div className="font-semibold text-lg p-2">AI Assistance</div>
        <div className="flex-grow p-2 space-y-2 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        {error && <div className="text-red-500 p-2">{error}</div>}
        <div className="p-2 flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-grow p-2 rounded-lg border border-gray-400"
          />
          <button
            onClick={sendMessage}
            className="p-2 rounded-lg bg-blue-500 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
