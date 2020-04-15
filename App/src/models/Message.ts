export class Message {
    userId: string;
    userName: string;
    message: string;
    date: Date;
    messageType: MessageType
  }

  export enum MessageType {
      Received,
      Sent
  }