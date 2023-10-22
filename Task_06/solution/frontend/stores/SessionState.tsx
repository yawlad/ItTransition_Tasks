import { action, makeAutoObservable, observable } from "mobx";

class SessionState {
  sessionId: string = "";
  username: string = "";
  socket: WebSocket | null = null;

  constructor() {
    makeAutoObservable(this, {
      sessionId: observable,
      username: observable,
      socket: observable,
      setSessionId: action,
      setUsername: action,
      setSocket: action,
    });
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }
  setUsername(username: string) {
    this.username = username;
  }
  setSocket(socket: WebSocket) {
    this.socket = socket;
  }
}

const sessionState = new SessionState();

export default sessionState;
