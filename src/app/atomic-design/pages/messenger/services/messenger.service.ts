import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Conversation} from '../models/conversation.interface';
import { v4 as uuid } from 'uuid';
import {Participant} from '../models/participant.interface';


@Injectable()
export class MessengerService {
  // INFO: we initialize the conversations observable with default value as empty.
  public conversations$: BehaviorSubject<Conversation[]> = new BehaviorSubject<Conversation[]>([]);

  constructor() {
    this.getConversations();
    this.conversations$.asObservable().subscribe(v => {
      console.log(v);
    })
  }

  public getConversations(): void {
    // INFO: Here we simulate that we get the conversations from the backend.
    this.conversations$.next(conversations);
  }

  public getPersonalData(): Participant {
    // NOTE: here we assume that we are logged in and got the user id from an auth service
    return {
      id: 1,
      name: 'John Doe',
      isOnline: true,
      avatar: undefined
    };
  }

  public sendMessage(conversationId: number, message: string): void {
    // NOTE: Here we assume that we sent the message to backend successfully. Preferably via a websocket connection.

    // NOTE: Now we append the new message to the existing ones.
    this.conversations$.next(this.conversations$.getValue().map(c => {
      if (c.id === conversationId) {
        return {...c, messages: [...c.messages, {id: uuid(), message, creatorId: 1, sentDateTime: new Date()}]};
      } else {
        return c;
      }
    }));
  }
}

const conversations: Conversation[] = [
  {
    id: 1,
    messages: [
      {
        id: uuid(),
        message: 'hello',
        creatorId: 1,
        sentDateTime: new Date()
      }
    ],
    participantInfo: {
      id: 2,
      name: 'Walter White',
      avatar: '',
      isOnline: true
    }
  },
  {
    id: 2,
    messages: [
      {
        id: uuid(),
        message: 'hello',
        creatorId: 1,
        sentDateTime: new Date()
      },
      {
        id: uuid(),
        message: 'hello',
        creatorId: 1,
        sentDateTime: new Date()
      },
      {
        id: uuid(),
        message: 'hello',
        creatorId: 2,
        sentDateTime: new Date()
      }
    ],
    participantInfo: {
      id: 3,
      name: 'Gustavo Fring',
      avatar: '',
      isOnline: true
    }
  }
];
