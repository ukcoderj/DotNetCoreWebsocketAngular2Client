import {Component, NgZone, Input, Output } from '@angular/core';
import { WebSocketServiceMvc } from '../services/websocketMvc.service';

@Component({
  selector: 'about',
  styleUrls: ['./about.component.css'],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  private testField: string;
    
  public messagesList: string[] = ["item1", "item2"];
  public singleMessage: string = '---';

  constructor(private _websocketServiceMvc: WebSocketServiceMvc, private _ngZone: NgZone){

    localStorage.setItem("test", "about..");
    var x = localStorage.getItem("test");
    this.testField = x;

    this._websocketServiceMvc.GetInstanceStatus().subscribe((result) => {
      this._ngZone.run(() => {
        this.messagesList.push(result);
      });
    }); 
  }

  sendMessage(): void {
    this._websocketServiceMvc.sendMessage(this.singleMessage);
  }


}
