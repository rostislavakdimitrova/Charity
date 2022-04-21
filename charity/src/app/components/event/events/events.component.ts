import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/core/models/Event';
import { CharityEventService } from 'src/app/core/services/charity-event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events!: Event[];

  constructor(private charityEventService: CharityEventService) { }

  ngOnInit(): void {
    this.charityEventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }
}