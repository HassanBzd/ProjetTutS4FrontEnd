export class GroupMessage {
  message?: string;
  groupId?: number;
  senderId?: string;
  datetimeSent: Date = new Date();
}
