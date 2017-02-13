import {Component, NgZone, Input, Output } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  private testField: string;
  
  public messagesList: string[] = ["message 1", "message 2"];
	public singleMessage: string = 'ok';

  constructor(private _websocketService: WebSocketService, private _ngZone: NgZone){

    localStorage.setItem("test", "Yatta!");
    var x = localStorage.getItem("test");
    this.testField = x;

    this._websocketService.GetInstanceStatus().subscribe((result) => {
      this._ngZone.run(() => {
        this.messagesList.push(result);
      });
    }); 
  }

  sendMessage(): void {
		this._websocketService.sendMessage(this.singleMessage);
	}


}
