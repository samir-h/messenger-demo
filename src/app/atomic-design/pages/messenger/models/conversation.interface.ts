import { Participant } from './participant.interface';
import { Message } from './message.interface';

export interface Conversation {
  id: number;
  participantInfo: Participant;
  messages: Message[];
}
