import MessageType from "@/types/MessageType";
import ToolBase from "./ToolBase";
import sessionState from "@/stores/SessionState";

class Rectangle extends ToolBase {
  startX: number = 0;
  startY: number = 0;
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
  }

  mouseDownHandler(e: MouseEvent) {
    super.mouseDownHandler(e);
    this.context.beginPath();
    this.context.moveTo(...this.getMouseCoords(e));
    let [startX, startY] = this.getMouseCoords(e);
    this.startX = startX;
    this.startY = startY;
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const [endX, endY] = this.getMouseCoords(e);
      let width = endX - this.startX;
      let height = endY - this.startY;
      Rectangle.draw(
        this.context,
        this.fillColor,
        this.lineWidth,
        this.startX,
        this.startY,
        width,
        height
      );
    }
  }

  mouseUpHandler(e: MouseEvent) {
    const [endX, endY] = this.getMouseCoords(e);
    let width = endX - this.startX;
    let height = endY - this.startY;
    const message: MessageType = {
      method: "draw",
      id: this.sessionId,
      username: sessionState.username,
      figure: {
        type: "rectangle",
        x: this.startX,
        y: this.startY,
        w: width,
        h: height,
        color: this.context.strokeStyle as string,
        width: this.context.lineWidth as number,
      },
    };
    this.socket.send(JSON.stringify(message));
    this.mouseDown = false;
  }

  static draw(
    context: CanvasRenderingContext2D,
    color: string,
    width: number,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    this.prepareToDraw(context, color, width);
    context.beginPath();
    context.rect(x, y, w, h);
    context.fill();
  }
}

export default Rectangle;
