"use client";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faDoorOpen,
  faDownload,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import toolState from "@/stores/ToolsState";
import Pencil from "@/objects/Pencil";
import canvasState from "@/stores/CanvasState";
import { observer } from "mobx-react";
import Eraser from "@/objects/Eraser";
import Link from "next/link";
import { MutableRefObject, useRef } from "react";
import sessionState from "@/stores/SessionState";
import Rectangle from "@/objects/Rectangle";
import SettingsBar from "./SettingsBar";

const Toolbar = observer(() => {
  const colorInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const changeColor = (color: string) => {
    console.log(color);
    toolState.setFillColor(color);
    toolState.setStrokeColor(color);
  };
  const download = () => {
    const dataUrl = canvasState.canvas?.toDataURL();
    const link = document.createElement("a");
    link.href = dataUrl as string;
    link.download = sessionState.sessionId + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed top-0 left-0 w-screen">
      <div className="z-50 flex gap-4 p-4 main-block justify-around">
        <div className="flex gap-4">
          <button
            onClick={() => {
              toolState.setTool(
                new Pencil(
                  canvasState.canvas as HTMLCanvasElement,
                  sessionState.socket as WebSocket,
                  sessionState.sessionId
                )
              );
              toolState.setStrokeColor(colorInputRef.current.value);
              toolState.setFillColor(colorInputRef.current.value);
            }}
            className={`standart-button hover:bg-gray-900 ${
              toolState.tool?.constructor === Pencil
                ? "active-tool bg-gray-950"
                : ""
            }`}
          >
            <FA icon={faPencil} />
          </button>
          <button
            onClick={() =>
              toolState.setTool(
                new Eraser(
                  canvasState.canvas as HTMLCanvasElement,
                  sessionState.socket as WebSocket,
                  sessionState.sessionId
                )
              )
            }
            className={`standart-button hover:bg-gray-900 ${
              toolState.tool?.constructor === Eraser
                ? "active-tool bg-gray-950"
                : ""
            }`}
          >
            <FA icon={faEraser} />
          </button>
          <button
            onClick={() =>
              toolState.setTool(
                new Rectangle(
                  canvasState.canvas as HTMLCanvasElement,
                  sessionState.socket as WebSocket,
                  sessionState.sessionId
                )
              )
            }
            className={`standart-button hover:bg-gray-900 ${
              toolState.tool?.constructor === Rectangle
                ? "active-tool bg-gray-950"
                : ""
            }`}
          >
            <FA icon={faRectangleXmark} />
          </button>
          <input
            ref={colorInputRef}
            className="cursor-pointer rounded-md h-full "
            type="color"
            onChange={(e) => changeColor(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button
            className="standart-button hover:bg-green-700"
            onClick={(e) => download()}
          >
            <FA icon={faDownload}></FA>
          </button>

          <Link href={"/"} className="standart-button hover:bg-red-500">
            <FA icon={faDoorOpen} />
          </Link>
        </div>
      </div>
      <SettingsBar></SettingsBar>
    </div>
  );
});

export default Toolbar;
