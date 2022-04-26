import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CharityEventService } from 'src/app/core/services/charity-event.service';
import { appAnimations } from 'src/app/core/app-animations';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const imagePattern = /^https?:\/\/(.+)/i;
const timePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
  animations: appAnimations
})
export class EventEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  
  faSave = faSave;

  constructor(private fb: FormBuilder, private charityEventService: CharityEventService, private router: Router, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      image: ['', [Validators.required, Validators.pattern(imagePattern)]],
      date:['', Validators.required],
      time: ['', [Validators.required, Validators.pattern(timePattern)]],
      location: ['', Validators.required],
      ticketPrice: ['', [Validators.required, Validators.min(0)]]
    });
    this.charityEventService.getEventDetails(this.id).pipe(first()).subscribe((x) => this.form.patchValue(x));
  }

  updateEvent() {
    this.charityEventService.updateEvent(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/event/details/' + this.id]);
    });
  }
}
