import { action, makeAutoObservable, observable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  constructor() {
    makeAutoObservable(this, {
      canvas: observable,
      setCanvas: action,
    });
  }

  setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
  }
}

const canvasState = new CanvasState();

export default canvasState;
