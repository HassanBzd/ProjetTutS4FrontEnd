export class Message {
  message?: string;
  receiverId?: string;
  senderId?: string;
  datetimeSent: Date = new Date();
}
