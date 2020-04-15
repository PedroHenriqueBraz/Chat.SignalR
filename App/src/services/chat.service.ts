import { Injectable, EventEmitter } from '@angular/core';
import { Message } from 'src/models/Message';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
    providedIn: 'root',
  })

export class ChatService { 
    messageReceived = new EventEmitter<Message>();
    private _hubConnection: HubConnection;
    
    constructor() {
        this.createConnection();
        this.startConnection();
        this.listenMessages();
    }

    private createConnection() {
        this._hubConnection = new HubConnectionBuilder()
          .withUrl('https://localhost:5001/chat')
          .build();
    }

    private startConnection(): void {
        this._hubConnection.start().then(() => {
            console.log('Conexao estabelecida!');
          })
          .catch(err => {
            console.log('Erro ao estabelcer conexao, tentando novamente...' + err);
            setTimeout(function () { this.startConnection(); }, 5000);
          });
    }
    
    sendMessage(message: Message): void {
        // por enquanto envia para todos clientes
        this._hubConnection.invoke('SendAll', message);
    }

    listenMessages(): void {
        this._hubConnection.on('ReceiveMessage', (data: any) => {
            this.messageReceived.emit(data);
        });
    }
}

