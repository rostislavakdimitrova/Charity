import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CauseService } from 'src/app/core/services/cause.service';
import { appAnimations } from 'src/app/core/app-animations';

const imagePattern = /^https?:\/\/(.+)/i;

@Component({
  selector: 'app-cause-create',
  templateUrl: './cause-create.component.html',
  styleUrls: ['./cause-create.component.css'],
  animations: appAnimations
})
export class CauseCreateComponent implements OnInit {

  form!: FormGroup;
  
  constructor(private fb: FormBuilder, private causeService: CauseService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      neededAmount: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required, Validators.pattern(imagePattern)]]
    });
  }

  createCause() {
    this.causeService.createCause(this.form.value).subscribe((data) => {
      this.router.navigate(['/cause/all'])
    });
  }
}
