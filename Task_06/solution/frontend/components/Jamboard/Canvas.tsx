"use client";
import { observer } from "mobx-react";
import { MutableRefObject, useEffect, useRef } from "react";
import canvasState from "@/stores/CanvasState";
import ImageService from "@/services/ImageService";
import sessionState from "@/stores/SessionState";
import MessageType from "@/types/MessageType";
import Pencil from "@/objects/Pencil";
import Eraser from "@/objects/Eraser";
import toolState from "@/stores/ToolsState";
import { usePathname } from "next/navigation";
import Rectangle from "@/objects/Rectangle";

const Canvas = observer(() => {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  const path = usePathname();

  useEffect(() => {
    const name = prompt("Enter your name: ") || "Unnamed";
    sessionState.setUsername(name);
    sessionState.setSessionId(path.slice(1));
    canvasState.setCanvas(canvasRef.current);
      
    ImageService.getImage(sessionState.sessionId)
      .then((res) => {
        const img = new Image();
        const context = canvasRef.current.getContext(
          "2d"
        ) as CanvasRenderingContext2D;
        img.src = res.data;
        img.onload = () => {
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          context.drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000/");
    sessionState.setSocket(socket);
    toolState.setTool(
      new Pencil(
        canvasState.canvas as HTMLCanvasElement,
        socket,
        sessionState.sessionId
      )
    );

    socket.onopen = () => {
      console.log("Connection");
      socket.send(
        JSON.stringify({
          id: path.slice(1),
          username: sessionState.username,
          method: "connection",
        })
      );
    };
    socket.onmessage = (event) => {
      let message = JSON.parse(event.data) as MessageType;
      switch (message.method) {
        case "connection":
          console.log(`Connected ${message.username}`);
          break;
        case "draw":
          drawHandler(message);
          break;
      }
    };
  }, []);

  const drawHandler = (message: MessageType) => {
    const figure = message.figure;
    const context = canvasState.canvas?.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    switch (figure?.type) {
      case "pencil":
        Pencil.draw(
          context,
          figure.color as string,
          figure.width as number,
          figure.x as number,
          figure.y as number
        );
        break;
      case "eraser":
        Eraser.draw(
          context,
          figure.width as number,
          figure.x as number,
          figure.y as number
        );
        break;

      case "rectangle":
        Rectangle.draw(
          context,
          figure.color as string,
          figure.width as number,
          figure.x as number,
          figure.y as number,
          figure.w as number,
          figure.h as number
        );
        break;
      case "finish":
        context.beginPath();
        break;
    }
  };

  const mouseUpHandler = () => {
    ImageService.postImage(
      sessionState.sessionId,
      canvasRef.current.toDataURL()
    )
      .then(() => console.log("OK"))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="z-10"
      onMouseUp={() => mouseUpHandler()}
    >
      <canvas
        ref={canvasRef}
        className=" bg-white"
        width={2500}
        height={1500}
      ></canvas>
    </div>
  );
});

export default Canvas;
