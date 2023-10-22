import canvasState from "@/stores/CanvasState";
import sessionState from "@/stores/SessionState";
import MessageType from "@/types/MessageType";

class ToolBase {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  mouseDown: boolean;
  socket: WebSocket;
  sessionId: string;
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.mouseDown = false;
    this.socket = socket;
    this.sessionId = sessionId;
    this.destroyEvents();
    this.listen();
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }
  getMouseCoords(e: MouseEvent): [number, number] {
    return [
      e.pageX - (e.target as HTMLElement).offsetLeft,
      e.pageY - (e.target as HTMLElement).offsetTop,
    ];
  }
  mouseUpHandler(e: MouseEvent) {
    this.mouseDown = false;
    const message: MessageType = {
      method: "draw",
      id: this.sessionId,
      username: sessionState.username,
      figure: {
        type: "finish",
      },
    };
    this.socket.send(JSON.stringify(message));
  }
  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;
  }
  mouseMoveHandler(e: MouseEvent) {
    this.mouseDown = true;
  }

  destroyEvents() {
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
    this.canvas.onmouseup = null;
  }

  set fillColor(color: string) {
    this.context.fillStyle = color;
  }
  set strokeColor(color: string) {
    this.context.strokeStyle = color;
  }
  set lineWidth(width: number) {
    this.context.lineWidth = width;
  }

  static prepareToDraw(
    context: CanvasRenderingContext2D,
    color: string,
    lineWidth: number
  ) {
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = lineWidth;
  }
}

export default ToolBase;
