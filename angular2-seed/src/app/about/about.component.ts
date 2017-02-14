import {Component, NgZone, Input, Output } from '@angular/core';
import { WebSocketServiceMvc } from '../services/websocketMvc.service';

@Component({
  selector: 'about',
  styleUrls: ['./about.component.css'],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  private connectionStatus: string;
    
  public messagesList: string[] = ["item1"];
  public singleMessage: string = '';

  constructor(private _websocketServiceMvc: WebSocketServiceMvc, private _ngZone: NgZone){


    this.connectionStatus = 'disconnected';

    this._websocketServiceMvc.SetupConnection();

    this._websocketServiceMvc.webSocketMessageEvent.subscribe((message: string) => {
      this._ngZone.run(() => {
        this.messagesList.push(message);
      });
    }); 

    this._websocketServiceMvc.webSocketConnectedEvent.subscribe((status: string) => {
      this._ngZone.run(() => {
        this.connectionStatus = status;
      });
    });

    this._websocketServiceMvc.webSocketClosedEvent.subscribe((status: string) => {
      this._ngZone.run(() => {
        this.connectionStatus = status;
      });
    });
  }

  sendMessage(): void {
    this._websocketServiceMvc.sendMessage(this.singleMessage);
  }


}
