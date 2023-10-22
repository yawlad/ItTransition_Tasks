interface MessageType {
  id: string;
  username: string;
  method: "connection" | "draw";
}

export default MessageType;
