import MessageType from "@/types/MessageType";
import ToolBase from "./ToolBase";
import sessionState from "@/stores/SessionState";

class Pencil extends ToolBase {
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
          type: "pencil",
          x: x,
          y: y,
          color: this.context.strokeStyle as string,
          width: this.context.lineWidth as number,
        },
      };
      this.socket.send(JSON.stringify(message));
    }
  }

  static draw(
    context: CanvasRenderingContext2D,
    color: string,
    width: number,
    x: number,
    y: number
  ) {
    this.prepareToDraw(context, color, width);
    context.lineTo(x, y);
    context.stroke();
  }
}

export default Pencil;
