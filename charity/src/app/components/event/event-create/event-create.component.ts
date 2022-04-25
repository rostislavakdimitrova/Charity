import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CharityEventService } from 'src/app/core/services/charity-event.service';
import { appAnimations } from 'src/app/core/app-animations';

const imagePattern = /^https?:\/\/(.+)/i;
const timePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
  animations: appAnimations
})
export class EventCreateComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private charityEventService: CharityEventService, private router: Router) { }

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
  }

  createEvent() {
    this.charityEventService.createEvent(this.form.value).subscribe((data) => {
      this.router.navigate(['/event/all']);
    });
  }
}
