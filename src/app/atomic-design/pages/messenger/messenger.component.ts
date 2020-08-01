import { Component, OnInit } from '@angular/core';
import {MessengerService} from './services/messenger.service';
import {Conversation} from './models/conversation.interface';
import {Message} from './models/message.interface';
import {Participant} from './models/participant.interface';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  // INFO: the conversations are of type Observable because in real-life we would wait for the messages to come from backend.
  public conversations: Conversation[];
  public messages: Message[] | undefined;
  public personalData: Participant;

  // NOTE: we use this variable to know which is the current selected conversation
  private selectedConversationId: number | undefined;

  constructor(private messengerService: MessengerService) {
    this.messengerService.conversations$.asObservable().subscribe(data => {
      this.conversations = data;

      // INFO: if the conversation changes ( we add new messages ) we update the messages variable
      if (this.selectedConversationId) {
        this.messages = this.conversations.find(c => c.id === this.selectedConversationId).messages;
      }
    });

    this.personalData = messengerService.getPersonalData();
  }

  ngOnInit(): void {
  }

  // INFO: here we assign value to the messages variable based on the selected conversation.
  // messages by default are undefined since we don't have any pre-selected conversation.
  public onConversationSelected(data: {conversationId: number}): void {
    this.selectedConversationId = data.conversationId;
    this.messages = this.conversations.find(c => c.id === data.conversationId).messages;
  }

  // NOTE: here we send the message to the service.
  public onMessageSend(data: {message: string}): void {
    if (this.selectedConversationId) {
      this.messengerService.sendMessage(this.selectedConversationId, data.message);
    }
  }

}
