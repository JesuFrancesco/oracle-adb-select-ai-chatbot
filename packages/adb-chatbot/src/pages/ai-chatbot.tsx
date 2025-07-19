import { useEffect, useMemo, useRef, useState } from "react";
import { IMessage } from "../interface/IMessage";
import { useMessage } from "../hooks/use-message";
import { askChatbot } from "../service/chat.service";
import { Message } from "../components/message";
import { Badge } from "../components/badge";
import { ModeEnum } from "../interface/ModeEnum";
import { ModeSelector } from "./components/mode-selector";

export default function ChatbotPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, replaceLastMessage } = useMessage();
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.NARRATE);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userActed = useMemo(() => {
    return messages.some((message) => message.sender === "user");
  }, [messages]);

  // scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    const botMessage: IMessage = {
      id: crypto.randomUUID(),
      content: "...",
      sender: "bot",
      timestamp: new Date(),
    };

    try {
      setIsLoading(true);

      if (!prompt.trim()) return;

      const userMessage: IMessage = {
        id: crypto.randomUUID(),
        content: prompt,
        sender: "user",
        timestamp: new Date(),
      };

      setPrompt("");

      setMessages((prev) => [...prev, userMessage, botMessage]);

      const { response, metadata } = await askChatbot(prompt, mode);

      replaceLastMessage({
        ...botMessage,
        content: response,
        metadata: metadata,
      });
    } catch (error) {
      replaceLastMessage({
        ...botMessage,
        content:
          "⚠️ Lo siento, no pude procesar tu solicitud. Inténtalo más tarde.",
        metadata: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen justify-center gap-4 p-4">
      <h1 id="chat-title" className="text-3xl font-bold text-center">
        Chat BANCOLIMA
      </h1>

      <div className="flex flex-row justify-between">
        <Badge className="font-bold">Modo {mode}</Badge>
        <ModeSelector mode={mode} setMode={setMode} />
      </div>

      <section
        id="chat-container"
        className="flex flex-col h-[400px] grow overflow-y-auto p-4 gap-4 border border-transparent rounded-3xl"
        ref={scrollRef}
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            sender={message.sender}
            metadata={message.metadata ?? undefined}
          >
            {message.content}
          </Message>
        ))}
      </section>

      {!userActed && (
        <section className="flex flex-row overflow-x-auto whitespace-nowrap gap-3 px-4 py-2 my-2">
          {[
            ["💱", "Cuántos cambios de divisa han realizado los clientes"],
            ["👤", "Qué tipos de cuentas tienen asociados los clientes"],
            [
              "🏦",
              "Cuál es el saldo promedio de las cuentas bancarias de los clientes",
            ],
            [
              "💰",
              "Cuáles son los depósitos a plazo fijo más solicitados por los clientes",
            ],
            ["📜", "Qué fianzas activas tienen los clientes actualmente"],
            [
              "📈",
              "Qué rentabilidad tienen los fondos de inversión más utilizados por los clientes",
            ],
            [
              "🏠",
              "Qué condiciones tienen las hipotecas contratadas por los clientes",
            ],
            ["🚗", "Qué contratos de leasing mantienen los clientes activos"],
            [
              "💸",
              "Qué pagos de servicios realizan con mayor frecuencia los clientes",
            ],
            [
              "📅",
              "Cuáles son los planes de pensión más contratados por los clientes",
            ],
            [
              "🏦",
              "Qué préstamos personales están siendo solicitados por los clientes",
            ],
            [
              "💳",
              "Cuál es el promedio del límite de crédito otorgado a los clientes",
            ],
            [
              "🔁",
              "Qué volumen de transferencias han realizado los clientes en los últimos 30 días",
            ],
          ].map((recommendation, index) => (
            <Badge
              className="cursor-pointer border-0 dark:bg-[#0f0f0f98] text-sm"
              onClick={() => {
                setPrompt(recommendation[1]);
              }}
              key={index}
            >
              {recommendation[0]} {recommendation[1]}
            </Badge>
          ))}
        </section>
      )}

      <section className="w-full flex flex-row h-fit items-center gap-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none"
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

        <button
          disabled={isLoading || !prompt.trim()}
          type="button"
          className="disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded transition-colors"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </section>

      <section>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          El ChatBot puede cometer errores o no entender tu consulta.
        </p>
      </section>
    </main>
  );
}
