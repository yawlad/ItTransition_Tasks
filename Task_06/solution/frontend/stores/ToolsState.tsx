import ToolBase from "@/objects/ToolBase";
import { action, makeAutoObservable, observable } from "mobx";

class ToolState {
  tool: null | ToolBase = null;
  
  constructor() {
    makeAutoObservable(this, {
      tool: observable,
      setTool: action,
    });
  }

  setTool(tool: any) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    (this.tool as ToolBase).fillColor = color;
  }
  setStrokeColor(color: string) {
    (this.tool as ToolBase).strokeColor = color;
  }
  setLineWidth(width: number) {
    (this.tool as ToolBase).lineWidth = width;
  }
}

const toolState = new ToolState();

export default toolState;
