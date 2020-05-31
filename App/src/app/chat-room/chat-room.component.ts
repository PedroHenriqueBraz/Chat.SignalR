import { Component, OnInit } from '@angular/core';
import { Message } from 'src/models/Message';
import { ChatService } from 'src/services/chat.service';
import { Participant } from 'src/models/Participant';

@Component({
  selector: 'chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit{
  messages = new Array<Message>();
  message = new Message();
  txtMessage: string = '';
  participantMock = new Participant();
  participants = [];
  isPrivateMessage = false;
  receiverName = '';

  constructor(private chatService: ChatService){}

  ngOnInit(): void {
    this.getOnlineUsers();
    this.receiveParticipants();
    this.receiveMessages();
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = this.chatService.createMessageToSend(this.txtMessage);
      this.chatService.sendMessage(this.message, this.receiverName);
      this.pushLocalMessages(this.message, this.receiverName);
      this.txtMessage = '';
    }
  }

  sendTo(name?: string) {
   this.receiverName = name;
  }

  private receiveMessages(): void {
    this.chatService.messageReceived.subscribe((message: Message)=>{
        this.messages.push(message);
        console.log(message);
    });
  }

  private receiveParticipants() {
    this.chatService.participantConnected.subscribe((p: Participant) => {
      console.log(p);
      this.participants.push(p);
    });
  }

  private pushLocalMessages(message: Message, receiverName: string) {
    if (receiverName) {
      message.isPrivate = true;
    }
    this.messages.push(message);
  }

  private getOnlineUsers(){
    this.chatService.getOnlineUsers().subscribe((data: Array<Participant>) => {
      this.participants = data;
    });
  }
}
 