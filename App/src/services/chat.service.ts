import { Injectable, EventEmitter } from '@angular/core';
import { Message } from 'src/models/Message';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Participant } from 'src/models/Participant';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
  })

export class ChatService { 
    messageReceived = new EventEmitter<Message>();
    participantConnected = new EventEmitter<Participant>();
    private _hubConnection: HubConnection;
    connectionId: string;
    
    constructor(private tokenService: TokenService) {
        this.createConnection(); 
        this.startConnection();
        this.listenParticipants();
        this.listenMessages();
    }

    private createConnection() {
        console.log('criar conexao');
        this._hubConnection = new HubConnectionBuilder()
          .withUrl('https://localhost:5001/chat', {
            accessTokenFactory: () => this.tokenService.getToken()
          })
          .build();
    }

    private startConnection(): void {
        this._hubConnection.start().then(() => {
            console.log('Conexao estabelecida!');
            this._hubConnection.invoke('getConnectionId')
                .then((connectionId) => {
                   console.log('meu id de conexao: '+ connectionId);
                   this.connectionId = connectionId;
                }).catch(err => console.error(err.toString()));
          }).catch(err => {
            console.log('Erro ao estabelecer conexao, tentando novamente...' + err);
            setTimeout(function () { this.startConnection(); }, 5000);
          });
    }
    
    sendMessage(message: Message, receiver?: string): void {
        console.log('enviar...')
        console.log(message);
        if (receiver){
            this._hubConnection.invoke('SendPrivate',receiver, message);
            return;
        }
        this._hubConnection.invoke('SendAll', message);
    }
    
    createMessageToSend(txtMessage: string): Message {
        let message = new Message();
        message.isReceived = false;
        message.text = txtMessage;
        message.sendDate = new Date();
        return message;
    }

    private listenMessages(): void {
        this._hubConnection.on('ReceiveAllMessages', (data: Message) => {
            data.isReceived = true;
            data.isPrivate = false;
            this.messageReceived.emit(data);
        });

        this._hubConnection.on('ReceivePrivateMessages', (data: Message) => {
            data.isReceived = true;
            data.isPrivate = true;
            this.messageReceived.emit(data);
        });
    }
 
    private listenParticipants(){
        this._hubConnection.on('NewParticipant', (data: any) => {
            let participant = new Participant();
            participant.Name = data;
            this.participantConnected.emit(participant);
        })
    }
}

