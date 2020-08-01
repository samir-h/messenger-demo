import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { Conversation } from '../../models/conversation.interface';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
  @Input() conversations: Conversation[] = [];
  @Input() selectedConversationId: number | undefined;
  @Output() conversationSelected = new EventEmitter<{
    conversationId: number;
  }>();
  constructor() {}

  // INFO: here we let the parent component know which conversation was selected;
  public selectChat(conversationId: number): void {
    this.conversationSelected.emit({ conversationId });
  }
  // INFO: we user the track by function to improve app performance and re-render only the changed items.
  conversationsTrackByFn = (index: number, item: Conversation) => item.id;
}
