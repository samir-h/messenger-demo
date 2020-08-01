import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Conversation } from '../models/conversation.interface';
import { v4 as uuid } from 'uuid';
import { Participant } from '../models/participant.interface';
import { User } from '../../../../shared/models/user.interface';
import { Message } from '../models/message.interface';

@Injectable()
export class MessengerService {
  // INFO: we initialize the conversations observable with default value as empty.
  public conversations$ = new BehaviorSubject<Conversation[]>([]);
  public messages$ = new BehaviorSubject<Message[] | undefined>(undefined);
  public selectedConversation$ = new BehaviorSubject<number | undefined>(
    undefined
  );
  public users$ = new BehaviorSubject<User[]>([]);

  constructor() {
    // INFO: here we assume that we got these data from backend and we are assigning them to the variables
    this.conversations$.next(CONVERSATIONS);
    this.users$.next(users);

    // INFO: Using the combineLatest operator we get the latest conversations values and the selectedConversation from where we get the messages data.
    combineLatest([
      this.conversations$.asObservable(),
      this.selectedConversation$.asObservable(),
    ]).subscribe(
      ([conversations, selectedConversationId]: [
        Conversation[],
        number | undefined
      ]) => {
        this.messages$.next(
          conversations.find((c) => c.id === selectedConversationId)?.messages
        );
      }
    );
  }

  public getPersonalData(): Participant {
    // NOTE: here we assume that we are logged in and got the user id from an auth service
    return {
      id: 1,
      name: 'John Doe',
      isOnline: true,
      avatar: undefined,
    };
  }

  public sendMessage(conversationId: number, message: string): void {
    // NOTE: Here we assume that we sent the message to backend successfully. Preferably via a websocket connection.

    // NOTE: Now we append the new message to the existing ones using the spread operator.
    this.conversations$.next(
      this.conversations$.getValue().map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [
              ...c.messages,
              { id: uuid(), message, creatorId: 1, sentDateTime: new Date() },
            ],
          };
        } else {
          return c;
        }
      })
    );
  }

  public startNewConversation(user: User): void {
    // INFO: we add a the new conversation to the list using the spread operator.
    const conversationId = this.conversations$.getValue().length + 1;
    this.conversations$.next([
      ...this.conversations$.getValue(),
      {
        id: conversationId,
        messages: [],
        participantInfo: user,
      },
    ]);

    this.setSelectedConversation(conversationId);
  }

  public setSelectedConversation(conversationId: number): void {
    this.selectedConversation$.next(conversationId);
  }
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    messages: [
      {
        id: uuid(),
        message: 'hello',
        creatorId: 1,
        sentDateTime: new Date(),
      },
    ],
    participantInfo: {
      id: 2,
      name: 'Walter White',
      avatar: '',
      isOnline: true,
    },
  },
  {
    id: 2,
    messages: [
      {
        id: uuid(),
        message: 'hello',
        creatorId: 1,
        sentDateTime: new Date(),
      },
      {
        id: uuid(),
        message: 'hi',
        creatorId: 2,
        sentDateTime: new Date(),
      },
    ],
    participantInfo: {
      id: 3,
      name: 'Gustavo Fring',
      avatar: '',
      isOnline: true,
    },
  },
];

const users: User[] = [
  {
    id: 4,
    name: 'Mike Ehrmantraut',
    avatar: '',
    isOnline: true,
  },
  {
    id: 5,
    name: 'Hank Schrader',
    avatar: '',
    isOnline: true,
  },
];
