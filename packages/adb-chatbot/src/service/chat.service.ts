export const askChatbot = async (prompt: string) => {
  const res = await fetch("http://localhost:8000/api/v1/chat/answer", {
    method: "POST",
    body: JSON.stringify({
      prompt,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    return {
      response: `Lo siento, no pude procesar tu solicitud. Por favor, intenta de nuevo.`,
      ok: false,
    }
  }

  const data = await res.json();

  return data as {
    response: string;
    ok: boolean;
  };
};
