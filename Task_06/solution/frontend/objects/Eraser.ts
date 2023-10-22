import MessageType from "@/types/MessageType";
import Pencil from "./Pencil";
import sessionState from "@/stores/SessionState";
import ToolBase from "./ToolBase";

class Eraser extends ToolBase {
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
  }

  mouseDownHandler(e: MouseEvent) {
    super.mouseDownHandler(e);
    this.context.beginPath();
    this.context.moveTo(...this.getMouseCoords(e));
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const [x, y] = this.getMouseCoords(e);
      const message: MessageType = {
        method: "draw",
        id: this.sessionId,
        username: sessionState.username,
        figure: {
          type: "eraser",
          x: x,
          y: y,
          width: this.context.lineWidth as number,
        },
      };
      this.socket.send(JSON.stringify(message));
    }
  }

  static draw(
    context: CanvasRenderingContext2D,
    width: number,
    x: number,
    y: number
  ) {
    this.prepareToDraw(context, "#ffffff", width);
    context.lineTo(x, y);
    context.stroke();
  }
}

export default Eraser;
