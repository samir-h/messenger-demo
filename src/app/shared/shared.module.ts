import { NgModule } from '@angular/core';
import { AvatarComponent } from '../atomic-design/atoms/avatar/avatar.component';
import { UsersListComponent } from '../atomic-design/molecules/users-list/users-list.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [AvatarComponent, UsersListComponent],
  exports: [AvatarComponent, UsersListComponent],
})
export class SharedModule {}
