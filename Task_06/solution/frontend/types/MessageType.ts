interface MessageType {
  id: string;
  username: string;
  method: "connection" | "draw";
  figure?: {
    type: "pencil" | "eraser" | "rectangle" | "finish" ;
    x?: number;
    y?: number;
    color?: string;
    width?: number;
    w?: number;
    h?: number
  };
}

export default MessageType;
