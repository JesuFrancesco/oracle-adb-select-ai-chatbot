import config from "../config";
import { ModeEnum } from "../interface/ModeEnum";

export const askChatbot = async (prompt: string, mode: ModeEnum) => {
  const res = await fetch(config.VITE_API_URL, {
    method: "POST",
    body: JSON.stringify({
      prompt,
      mode,
    }),
  });

  if (res.status !== 200) {
    return {
      response: `Lo siento, no pude procesar tu solicitud. Por favor, intenta de nuevo.`,
      ok: false,
    };
  }

  const data = await res.json();

  return data as {
    response: string;
    ok: boolean;
  };
};
