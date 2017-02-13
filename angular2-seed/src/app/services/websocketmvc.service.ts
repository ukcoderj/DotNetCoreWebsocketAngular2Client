import { Component, Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Guid } from '../models/Guid';

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

		var thisClientId = Guid.newGuid();
		this.setCookie("my_id_cookie", thisClientId, 1);


		this.websocket = new WebSocket("ws://localhost:58809/ws"); //dummy echo websocket service
		this.websocket.onopen = (evt) => {
			var userId = evt;
			this.websocket.send("BINGO!!!");
		};

		return Observable.fromEvent(this.websocket, 'message')
			.map(res => (<any>res).data);
	}


	private setCookie(name: string, value: string, expireDays: number, path: string = "") {
        let d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires: string = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
    }

}