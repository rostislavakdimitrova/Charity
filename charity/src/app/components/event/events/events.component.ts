import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/Event';
import { CharityEventService } from 'src/app/core/services/charity-event.service';
import { appAnimations } from 'src/app/core/app-animations';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: appAnimations
})
export class EventsComponent implements OnInit {

  events!: Event[];
  isLoading = false;
  pageSize: number = 6;
  currentPage: number = 1;

  constructor(private charityEventService: CharityEventService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.charityEventService.getAllEvents().subscribe((data) => {
      this.isLoading = false;
      this.events = data;
    });
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
