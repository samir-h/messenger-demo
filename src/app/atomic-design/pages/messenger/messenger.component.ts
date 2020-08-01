import { Component, OnInit } from '@angular/core';
import { MessengerService } from './services/messenger.service';
import { Conversation } from './models/conversation.interface';
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
  public selectedConversation: Conversation | undefined;
  public personalData: Participant;
  public users: User[];

  // INFO: we will use this variable to show/hide the users list;
  public showUserList = false;

  constructor(private messengerService: MessengerService) {
    this.messengerService.conversations$
      .asObservable()
      .subscribe((data: Conversation[]) => {
        this.conversations = data;
      });
    this.messengerService.selectedConversation$
      .asObservable()
      .subscribe((conversation: Conversation | undefined) => {
        this.selectedConversation = conversation;
      });

    this.messengerService.users$.asObservable().subscribe((users: User[]) => {
      this.users = users;
    });

    this.personalData = messengerService.getPersonalData();
  }

  ngOnInit(): void {}

  public onConversationSelected(data: { conversationId: number }): void {
    this.messengerService.setSelectedConversation(data.conversationId);
  }

  // NOTE: here we send the message to the service.
  public onMessageSend(data: { message: string }): void {
    if (this.selectedConversation) {
      this.messengerService.sendMessage(
        this.selectedConversation.id,
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
