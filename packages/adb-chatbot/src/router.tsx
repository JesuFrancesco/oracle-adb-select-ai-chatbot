import { createHashRouter } from "react-router-dom";
import ChatbotPage from "./pages/ai-chatbot";

export const router = createHashRouter([
  {
    path: "/",
    element: <ChatbotPage />,
  },
  {
    path: "/chatbot",
    element: <ChatbotPage />,
  },
]);
