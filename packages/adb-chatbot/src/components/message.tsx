import Markdown from "react-markdown";

export function Message({
  children,
  sender,
}: {
  children: string;
  sender: "user" | "bot";
}) {
  return (
    <div
      className={`max-w-[70%] p-2 rounded-2xl ${
        sender === "user"
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      <Markdown>{children}</Markdown>
    </div>
  );
}
