import Markdown from "react-markdown";
import { Table } from "./table";

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
    <>
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
    </>
  );
}
