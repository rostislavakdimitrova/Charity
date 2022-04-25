import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cause } from 'src/app/core/models/Cause';
import { Event } from 'src/app/core/models/Event';
import { AuthService } from 'src/app/core/services/auth.service';
import { CauseService } from 'src/app/core/services/cause.service';
import { CharityEventService } from 'src/app/core/services/charity-event.service';
import { HelperService } from 'src/app/core/services/helper.service';
import { appAnimations } from 'src/app/core/app-animations';


const latestThreeQuery = '?sort={"createdAt":-1}&limit=3'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: appAnimations
})
export class HomeComponent implements OnInit {

  searchForm!: FormGroup;
  latestThreeCauses!: Cause[];
  latestThreeEvents!: Event[];
  isLoading = false;

  constructor(public authService: AuthService, private helperService: HelperService, private causeService: CauseService, private charityEventService: CharityEventService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.searchForm = new FormGroup({
      'query': new FormControl('', [
        Validators.required
      ])
    });
    this.causeService.searchCause(latestThreeQuery).subscribe((data: any) => {
      this.isLoading = false;
      this.latestThreeCauses = data['result'];
      console.log(data['result']);
    });

   this.charityEventService.searchEvent(latestThreeQuery).subscribe((data: any) => {
     this.isLoading = false;
      this.latestThreeEvents = data['result'];
      console.log(data['result']);
    });
  }

  onSubmit(): void {
    const query: string = this.searchForm.value.query.trim();
    if (query.length !== 0) {
      this.router.navigate([`/cause/all/${query}`]);
      this.helperService.searchQuery.next(query);
    }
  } 
}
