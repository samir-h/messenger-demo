export interface Message {
  // INFO: the message ID is string because we use a UUID generator for the messages ids.
  id: string;
  message: string;
  creatorId: number;
  sentDateTime: Date;
}
