export interface IMessage {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: Date;
}