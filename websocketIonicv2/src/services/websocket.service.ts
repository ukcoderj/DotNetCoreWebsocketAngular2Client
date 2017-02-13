import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WebSocketService {

	private actionUrl: string;
	private websocket: WebSocket;
	private receivedMsg: any;

	constructor() {
	}

	public sendMessage(text: string) {
		this.websocket.send(text);
	}

	public GetInstanceStatus(): Observable<any> {

		this.websocket = new WebSocket("ws://echo.websocket.org/"); //dummy echo websocket service
		this.websocket.onopen = (evt) => {
			this.websocket.send("Hello World");
		};

		return Observable.fromEvent(this.websocket, 'message')
			.map(res => (<any>res).data);
	}
}