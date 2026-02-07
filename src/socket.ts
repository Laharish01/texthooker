import { BehaviorSubject, NEVER, Subscription, filter, switchMap } from "rxjs";
import { newLine$, socketState } from "./store/store";

export class SocketConn {
  public wsURL: string;
  private socket: WebSocket | undefined;
  private socketState: BehaviorSubject<number> = socketState;

  constructor(url: string) {
    this.wsURL = url;
    this.connect();
  }

  connect() {
    if (this.socket?.readyState < 2) {
      return;
    }

    if (!this.wsURL) {
      this.socketState.next(3);
      return;
    }

    this.socketState.next(0);

    try {
      this.socket = new WebSocket(this.wsURL);
      this.socket.onopen = this.updateSocketState.bind(this);
      this.socket.onclose = this.updateSocketState.bind(this);
      this.socket.onmessage = this.handleMessage.bind(this);
    } catch (error) {
      this.socketState.next(3);
    }
  }

  public disconnect() {
    if (this.socket?.readyState === 1) {
      this.socket.close(1000, "User Request");
    }
  }

  private updateSocketState() {
    if (!this.socket) {
      return;
    }

    this.socketState.next(this.socket.readyState);
  }

  private handleMessage(event: MessageEvent) {
    let line = event.data;

    try {
      line = JSON.parse(event.data)?.sentence || event.data;
    } catch (_) {
      // no-op
    }

    newLine$.next(line);
  }
}
