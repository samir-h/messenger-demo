import { Component, OnInit } from '@angular/core';
import { MessengerService } from './services/messenger.service';
import { Conversation } from './models/conversation.interface';
import { Message } from './models/message.interface';
import { Participant } from './models/participant.interface';
import { User } from '../../../shared/models/user.interface';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  // INFO: the conversations are of type Observable because in real-life we would wait for the messages to come from backend.
  public conversations: Conversation[];
  public messages: Message[] | undefined;
  public personalData: Participant;
  public users: User[];

  // INFO: we will use this variable to show/hide the users list;
  public showUserList = false;

  // NOTE: we use this variable to know which is the current selected conversation
  private selectedConversationId: number | undefined;

  constructor(private messengerService: MessengerService) {
    this.messengerService.conversations$
      .asObservable()
      .subscribe((data: Conversation[]) => {
        this.conversations = data;
      });
    this.messengerService.messages$
      .asObservable()
      .subscribe((messages: Message[] | undefined) => {
        this.messages = messages;
      });

    this.messengerService.users$.asObservable().subscribe((users: User[]) => {
      this.users = users;
    });

    this.messengerService.selectedConversation$
      .asObservable()
      .subscribe((conversationId: number | undefined) => {
        this.selectedConversationId = conversationId;
      });

    this.personalData = messengerService.getPersonalData();
  }

  ngOnInit(): void {}

  public onConversationSelected(data: { conversationId: number }): void {
    this.messengerService.setSelectedConversation(data.conversationId);
  }

  // NOTE: here we send the message to the service.
  public onMessageSend(data: { message: string }): void {
    if (this.selectedConversationId) {
      this.messengerService.sendMessage(
        this.selectedConversationId,
        data.message
      );
    }
  }

  public setShowUsersList(visible: boolean): void {
    this.showUserList = visible;
  }

  public startNewConversation(user: User): void {
    // send a request to create a new conversation and return to the default view.
    this.messengerService.startNewConversation(user);
    this.setShowUsersList(false);
  }
}
