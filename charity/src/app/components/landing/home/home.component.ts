import { Component, OnInit } from '@angular/core';
import { Cause } from 'src/app/core/models/Cause';
import { Event } from 'src/app/core/models/Event';
import { AuthService } from 'src/app/core/services/auth.service';
import { CauseService } from 'src/app/core/services/cause.service';
import { CharityEventService } from 'src/app/core/services/charity-event.service';
import { appAnimations } from 'src/app/core/app-animations';


const latestThreeQuery = '?sort={"createdAt":-1}&limit=3'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: appAnimations
})
export class HomeComponent implements OnInit {

  latestThreeCauses!: Cause[];
  latestThreeEvents!: Event[];
  isLoading = false;

  constructor(public authService: AuthService, private causeService: CauseService, private charityEventService: CharityEventService) { }

  ngOnInit(): void {
    this.isLoading = true;
    
    this.causeService.getLastThree(latestThreeQuery).subscribe((data: any) => {
      this.isLoading = false;
      this.latestThreeCauses = data['result'];
      console.log(data['result']);
    });

   this.charityEventService.getLastThree(latestThreeQuery).subscribe((data: any) => {
     this.isLoading = false;
      this.latestThreeEvents = data['result'];
      console.log(data['result']);
    });
  }
}
