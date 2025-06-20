import { useEffect, useRef, useState } from "react";
import "./App.css";
import Markdown from "react-markdown";
import { IMessage } from "./interface/IMessage";
import { useMessage } from "./hooks/use-message";
import { askChatbot } from "./service/chat.service";

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, replaceLastMessage } = useMessage();
  const [prompt, setPrompt] = useState("");

  // scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    let botMessage: IMessage = {
      id: crypto.randomUUID(),
      content: "...",
      sender: "bot",
      timestamp: new Date(),
    };

    try {
      if (!prompt.trim()) return;

      const userMessage: IMessage = {
        id: crypto.randomUUID(),
        content: prompt,
        sender: "user",
        timestamp: new Date(),
      };

      setPrompt("");

      setMessages((prev) => [...prev, userMessage, botMessage]);

      const { response } = await askChatbot(prompt);

      replaceLastMessage({
        ...botMessage,
        content: response,
      });
    } catch (error) {
      replaceLastMessage({
        ...botMessage,
        content:
          "Lo siento, no pude procesar tu solicitud. Inténtalo más tarde.",
      });
    }
  };

  return (
    <main className="flex flex-col h-screen justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-center">Chat BANCOLIMA</h1>

      <div
        className="flex flex-col mt-4 h-[400px] grow overflow-y-auto p-4 gap-4 border border-gray-300 rounded"
        ref={scrollRef}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              <Markdown>{message.content}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-row h-fit items-center gap-4 mt-4">
        <textarea
          id="greet-input"
          className="w-full p-2 border border-gray-300 rounded"
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          rows={2}
          placeholder="Ingresa tu consulta..."
        />

        <button type="button" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </main>
  );
}

export default App;
