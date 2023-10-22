import express from "express";
import expressWs from "express-ws";
import { WebSocket } from "ws";
import MessageType from "./types/MessageType";
import WSType from "./types/WSType";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const WSServer = expressWs(app);
const { app: appWs, getWss } = expressWs(app);
const aWss = getWss();

const PORT = process.env.PORT || "5000";

appWs.ws("/", (ws, req) => {
  ws.send("Connected successfully");
  ws.on("message", (message: string) => {
    const parsedMessage = JSON.parse(message) as MessageType;
    switch (parsedMessage.method) {
      case "connection":
        connectionHandler(ws, parsedMessage);
        break;
      case "draw":
        broadcastConnection(ws, parsedMessage);
        break;
    }
  });
});

app.listen(PORT, () => {});

const connectionHandler = (ws: WSType, message: MessageType) => {
  ws.id = message.id;
  ws.username = message.username;
  broadcastConnection(ws, message);
};

const broadcastConnection = (ws: WSType, message: MessageType) => {
  aWss.clients.forEach((client: WSType) => {
    if (client.id == message.id) {
      client.send(JSON.stringify(message));
    }
  });
};

app.post("/image", (req, res) => {
  try {
    const data = req.body.img.replace("data:image/png;base64,", "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );
    return res.status(200).json("OK");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
});

app.get("/image", (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = "data:image/png;base64," + file.toString("base64");
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
});

app.get("/images", (req, res) => {
  try {
    fs.readdir(path.resolve(__dirname, "files"), (err, files) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Server error");
      } else {
        const data = files.map((file) => file.replace(".jpg", ""));
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
});
