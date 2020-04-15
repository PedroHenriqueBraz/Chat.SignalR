import { Component, OnInit } from '@angular/core';
import { Message, MessageType } from 'src/models/Message';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  messages = new Array<Message>();
  message = new Message();
  txtMessage: string = '';
 
  constructor(private chatService: ChatService){}

  ngOnInit(): void {
    this.receiveMessages();
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.userId = 'id';
      this.message.messageType = MessageType.Sent;
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      //this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }

  isReceived(type: MessageType): boolean {
    return type === MessageType.Received;
  }

  private receiveMessages(): void {
    this.chatService.messageReceived.subscribe((message)=>{
        console.log(message);
        this.messages.push(message);
    });
  }
}
