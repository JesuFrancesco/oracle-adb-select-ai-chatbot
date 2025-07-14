export interface IMessage {
  id: string;
  content: string;
  metadata?: string[][] | [];
  sender: "user" | "bot";
  timestamp: Date;
}
