import { WebSocket } from "ws";

interface WSType extends WebSocket{
  id?: string;
  username?: string;
}

export default WSType;
