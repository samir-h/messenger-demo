import {NgModule} from '@angular/core';
import {AvatarComponent} from '../atomic-design/atoms/avatar/avatar.component';

@NgModule({
  exports: [
    AvatarComponent
  ],
  declarations: [
    AvatarComponent
  ]
})
export class SharedModule{}
