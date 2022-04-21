import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CharityEventService } from 'src/app/core/services/charity-event.service';

const imagePattern = /(https?:\/\/.*\.(?:png|jpg))/i;
const datePattern = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
const timePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;

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
