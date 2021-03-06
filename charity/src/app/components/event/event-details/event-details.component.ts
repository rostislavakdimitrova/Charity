import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/core/models/Event';
import { AuthService } from 'src/app/core/services/auth.service';
import { CharityEventService } from 'src/app/core/services/charity-event.service';
import { appAnimations } from 'src/app/core/app-animations';
import { faLocationDot, faEdit, faTrash, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  animations: appAnimations
})
export class EventDetailsComponent implements OnInit {

  charityEvent!: Event;
  isLoading: boolean = false;
  id!: string;
  canJoin!: boolean; 
  
  faLocationDot = faLocationDot; 
  faEdit = faEdit;
  faTrash = faTrash;
  faHandHoldingHeart = faHandHoldingHeart;

  constructor(public authService: AuthService, private charityEventService: CharityEventService, private route: ActivatedRoute, private router: Router, public toastr: ToastrService) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.charityEventService.getEventDetails(this.id).subscribe((data) => {
      this.isLoading = false;
      const user = JSON.parse(localStorage.getItem('currentUser')!);
      this.charityEvent = data;
      this.canJoin = !this.charityEvent.volounteers.includes(user);
    });
  }

  deleteEvent(id: string) {
    this.charityEventService.deleteEvent(this.id).subscribe(() => {
      this.router.navigate(['/event/all']);
    });
  }

  volounteer() {
  
    if (this.canJoin) {
      const user = JSON.parse(localStorage.getItem('currentUser')!);
     
      console.log(user);
  
      this.charityEventService.volounteerToEvent(this.id).subscribe(() => {
        this.charityEvent.volounteers.push(user);
        this.canJoin = !this.canJoin;
        console.log(this.charityEvent);
        this.toastr.success('You have successfully joined the event. Thank You!');  
      });
    }
  }
}
