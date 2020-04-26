import { Injectable, EventEmitter } from '@angular/core';
import { Message } from 'src/models/Message';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Participant } from 'src/models/Participant';

@Injectable({
    providedIn: 'root',
  })

export class ChatService { 
    messageReceived = new EventEmitter<Message>();
    participantConnected = new EventEmitter<Participant>();
    private _hubConnection: HubConnection;
    connectionId: string;

    constructor() {
        this.createConnection();
        this.startConnection();
       // this.listenParticipants();
        this.listenMessages();
    }

    private createConnection() {
        console.log('criar conexao');
        this._hubConnection = new HubConnectionBuilder()
          .withUrl('https://localhost:5001/chat', {
            accessTokenFactory: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJvYmluIiwicm9sZSI6ImVtcGxveWVlIiwibmJmIjoxNTg3ODU4NTQ4LCJleHAiOjE1ODc4NjU3NDgsImlhdCI6MTU4Nzg1ODU0OH0.i_ceoc_OecCcYooohKHn5K5Zkrr8pIWvnMOUMwutZwA"
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
    
    sendMessage(message: Message): void {
        // por enquanto envia para todos clientes
        this._hubConnection.invoke('SendAll', message);
    }

    private listenMessages(): void {
        // apenas escutando todas msgs
        this._hubConnection.on('ReceiveAllMessages', (data: any) => {
            this.messageReceived.emit(data);
        });
    }

    private listenParticipants(){
        this._hubConnection.on('NewParticipant', (data: any) => {
            this.participantConnected.emit(data);
        })
    }
}

