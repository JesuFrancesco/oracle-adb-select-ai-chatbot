import { useState } from "react";
import { IMessage } from "../interface/IMessage";

export const useMessage = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: crypto.randomUUID(),
      content: "¡Bienvenido a BANCOLIMA!",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: crypto.randomUUID(),
      content: "Hola, ¿en qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const replaceLastMessage = (newMessage: IMessage) => {
    setMessages((prevMessages) => {
      if (prevMessages.length === 0) return [newMessage];
      return [...prevMessages.slice(0, -1), newMessage];
    });
  };

  return { messages, setMessages, replaceLastMessage };
};
