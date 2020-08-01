import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Message } from '../../models/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  @Input() messages: Message[] | undefined = undefined;
  @Input() loggedInUserId: number | undefined;
  @Output() send = new EventEmitter<{ message: string }>();
  @ViewChild('inputField') inputField: ElementRef;
  constructor() {}

  public onKeyPres(event: KeyboardEvent): void {
    // NOTE: here we listen on Enter keypress to send the message to parent component
    if (event.key === 'Enter') {
      this.send.emit({ message: this.inputField.nativeElement.value });
      this.inputField.nativeElement.value = '';
    }
  }

  // NOTE: with this function we send the message to parent component when we click on the send icon
  onSendPress(): void {
    this.send.emit({ message: this.inputField.nativeElement.value });
    this.inputField.nativeElement.value = '';
  }

  public messageTrackByFn = (index: number, item: Message) => item.id;
}
