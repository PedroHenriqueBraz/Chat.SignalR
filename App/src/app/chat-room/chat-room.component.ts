import { Component, OnInit } from '@angular/core';
import { Message, MessageType } from 'src/models/Message';
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
  

  constructor(private chatService: ChatService){}

  ngOnInit(): void {
   // this.receiveParticipants();
    this.receiveMessages();
    this.participantMock.Name = 'Pedro';
    this.participants.push(this.participantMock);
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.userId = 'id';
      this.message.messageType = MessageType.Sent;
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }

  isReceived(type: MessageType): boolean {
    return type === MessageType.Received;
  }

  private receiveMessages(): void {
    this.chatService.messageReceived.subscribe((message: Message)=>{
        //message.messageType = MessageType.Received;
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
}
 