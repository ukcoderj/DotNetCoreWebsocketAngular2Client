import { Component, Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WebSocketServiceMvc {

	private actionUrl: string;
	private websocket: WebSocket;
	private receivedMsg: any;

	constructor() {
	}

	public sendMessage(text: string) {
		this.websocket.send(text);
	}

	public GetInstanceStatus(): Observable<any> {

		//var t = window.localStorage.getItem("test");

		//var Socket = window['WebSocket'] || window['MozWebSocket'];
		this.websocket = new WebSocket("ws://localhost:58809/ws"); //dummy echo websocket service
		this.websocket.onopen = (evt) => {
			this.websocket.send("BINGO!!!");
		};

		return Observable.fromEvent(this.websocket, 'message')
			.map(res => (<any>res).data);
	}
}