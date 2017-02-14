import { Component, Injectable, Inject, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Guid } from '../models/Guid';

@Injectable()
export class WebSocketServiceMvc {

	private actionUrl: string;
	private websocket: WebSocket;
	private receivedMsg: any;


	public webSocketMessageEvent: EventEmitter<string>;

	// try an eventEmitter here to keep retry logic working.

	constructor() {
		this.webSocketMessageEvent = new EventEmitter<string>();
	}

	public sendMessage(text: string) {
		this.websocket.send(text);
	}

	public RetryConnect(): void {
		setTimeout(() => {
			try {
				this.SetupConnection();
			} catch (ex) {
				this.RetryConnect();
			}
		}, 5000);
	}

	public SetupConnection(): void {

		var thisClientId: string = null;
		thisClientId = this.getCookie("my_id_cookie");
		if (!thisClientId) {
			thisClientId = Guid.newGuid();
			this.setCookie("my_id_cookie", thisClientId, 1);
		}

		var webSocketUrl = "ws://localhost:58809/ws";
		this.websocket = new WebSocket(webSocketUrl); //dummy echo websocket service
		this.websocket.onopen = (evt) => {
			var userId = evt;
			this.websocket.send("connected - ping!!!");
		};

		this.websocket.onclose = (evt) => {
			this.RetryConnect();
		};

		this.websocket.onerror = (evt) => {
			// notify of error?
		};

		this.websocket.onmessage = (evt) => {
			this.webSocketMessageEvent.emit(evt.data);
		};
	}


	private setCookie(name: string, value: string, expireDays: number, path: string = "") {
        let d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires: string = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
    }

	private getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = name + "=";
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s\+/g, "");
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return "";
    }

}