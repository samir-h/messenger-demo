import { NgModule } from '@angular/core';
import { MessengerComponent } from './messenger.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MessengerService } from './services/messenger.service';

@NgModule({
  imports: [CommonModule, MaterialModule, SharedModule],
  exports: [MessengerComponent],
  declarations: [MessengerComponent, ChatListComponent, ChatComponent],
  providers: [MessengerService],
})
// NOTE: we use this module to declare the components that will be used for the messenger
export class MessengerModule {}
