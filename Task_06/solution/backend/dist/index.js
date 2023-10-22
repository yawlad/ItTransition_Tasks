"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
const WSServer = (0, express_ws_1.default)(app);
const { app: appWs, getWss } = (0, express_ws_1.default)(app);
const aWss = getWss();
const PORT = process.env.PORT || "5000";
appWs.ws("/", (ws, req) => {
    ws.send("Connected successfully");
    ws.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
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
app.listen(PORT, () => { });
const connectionHandler = (ws, message) => {
    ws.id = message.id;
    ws.username = message.username;
    broadcastConnection(ws, message);
};
const broadcastConnection = (ws, message) => {
    aWss.clients.forEach((client) => {
        if (client.id == message.id) {
            client.send(JSON.stringify(message));
        }
    });
};
app.post("/image", (req, res) => {
    try {
        const data = req.body.img.replace("data:image/png;base64,", "");
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "files", `${req.query.id}.jpg`), data, "base64");
        return res.status(200).json("OK");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Server error");
    }
});
app.get("/image", (req, res) => {
    try {
        const file = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "files", `${req.query.id}.jpg`));
        const data = "data:image/png;base64," + file.toString("base64");
        res.json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Server error");
    }
});
app.get("/images", (req, res) => {
    try {
        fs_1.default.readdir(path_1.default.resolve(__dirname, "files"), (err, files) => {
            if (err) {
                console.log(err);
                return res.status(500).json("Server error");
            }
            else {
                const data = files.map((file) => file.replace(".jpg", ""));
                return res.status(200).json(data);
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Server error");
    }
});
