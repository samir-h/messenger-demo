import {NgModule} from '@angular/core';
import {MessengerComponent} from './messenger.component';
import {ChatListComponent} from './components/chat-list/chat-list.component';

@NgModule({
  exports: [
    MessengerComponent
  ],
  declarations: [MessengerComponent, ChatListComponent]
})
// NOTE: we use this module to declare the components that will be used for the messenger
export class MessengerModule {}
