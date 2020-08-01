import {NgModule} from '@angular/core';
import {MessengerComponent} from './messenger.component';
import {ChatListComponent} from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  exports: [
    MessengerComponent
  ],
  declarations: [MessengerComponent, ChatListComponent, ChatComponent]
})
// NOTE: we use this module to declare the components that will be used for the messenger
export class MessengerModule {}
