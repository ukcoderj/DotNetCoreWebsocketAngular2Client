import { Component, NgZone } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public messagesList: string[] = ["message 1", "message 2"];
  public singleMessage: string = 'ok';

  constructor(public navCtrl: NavController, private _websocketService: WebSocketService, private _ngZone: NgZone) {
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
