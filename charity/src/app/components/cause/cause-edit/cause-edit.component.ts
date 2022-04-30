import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CauseService } from 'src/app/core/services/cause.service';
import { appAnimations } from 'src/app/core/app-animations';
import { faSave } from '@fortawesome/free-solid-svg-icons';


const imagePattern = /^https?:\/\/(.+)/i;

@Component({
  selector: 'app-cause-edit',
  templateUrl: './cause-edit.component.html',
  styleUrls: ['./cause-edit.component.css'],
  animations: appAnimations
})
export class CauseEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  
  faSave = faSave;

  constructor(private fb: FormBuilder, private causeService: CauseService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      neededAmount: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required, Validators.pattern(imagePattern)]]
    });

    this.causeService.getCauseDetails(this.id).subscribe((x) => this.form.patchValue(x));
  }

  updateCause() {
    this.causeService.updateCause(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/cause/details/' + this.id]);
    });
  }
}
