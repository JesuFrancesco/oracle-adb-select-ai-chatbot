import Markdown from "react-markdown";
import { Table } from "./table";
import userAvatar from "../assets/oracle.png";
import botAvatar from "../assets/user.png";

export function Message({
  children,
  sender,
  metadata,
}: {
  children: string;
  sender: "user" | "bot";
  metadata?: string[][];
}) {
  return (
    <div
      className={`flex items-top gap-2 my-2 ${
        sender === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {sender === "user" ? (
        <img
          className="rounded-full p-2 h-10 bg-blue-500"
          alt="User Avatar"
          src={botAvatar}
        />
      ) : (
        <img
          className="rounded-full p-2 h-10 bg-gray-300"
          alt="Bot Avatar"
          src={userAvatar}
        />
      )}
      {children != "" && (
        <div
          className={`max-w-[70%] p-2 rounded-2xl ${
            sender === "user"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 text-black self-start"
          }`}
        >
          <Markdown>{children}</Markdown>
        </div>
      )}

      {metadata && metadata?.length > 0 ? <Table data={metadata} /> : null}
    </div>
  );
}
