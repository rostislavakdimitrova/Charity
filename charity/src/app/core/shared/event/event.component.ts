import { Component, Input } from '@angular/core';
import { Event } from 'src/app/core/models/Event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input('charityEvent') charityEvent!: Event;

}
