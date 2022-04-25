import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cause } from 'src/app/core/models/Cause';
import { AuthService } from 'src/app/core/services/auth.service';
import { CauseService } from 'src/app/core/services/cause.service';
import { appAnimations } from 'src/app/core/app-animations';

const namePattern = /^[A-Z][a-z]+$/;
const cardPattern = /^([0-9][ -]*?){13,16}$/;
const cvvPattern = /^[0-9]{3}$/;
const datePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

@Component({
  selector: 'app-cause-details',
  templateUrl: './cause-details.component.html',
  styleUrls: ['./cause-details.component.css'],
  animations: appAnimations
})
export class CauseDetailsComponent implements OnInit {

  form!: FormGroup;
  cause!: Cause;
  id!: string;
  percentage!: number;
  //currencies: Array<string> = ['BGN', 'EUR', 'USD', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR', 'TRY', 'UAH', 'SEK', 'RSD', 'RUB', 'RON', 'PLN', 'HUF', 'CZK', 'HRK'];
  currentAmount!: number;
  hasDonated!: boolean;
  isLoading: boolean = false;

  constructor(private fb:FormBuilder,
     public authService: AuthService, 
     private causeService: CauseService, 
     private route: ActivatedRoute, 
     private router: Router,
     public toastr: ToastrService) { 
      this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initForm();
    
    this.causeService.getCauseDetails(this.id).subscribe((data) => {
      this.isLoading = false;
      this.cause = data;
      
      this.percentage = (Number(this.cause.raisedAmount)/Number(this.cause.neededAmount))*100;
    });
  }

  deleteCause(id: string) {
    this.causeService.deleteCause(this.id).subscribe(() => {
      this.router.navigate(['/cause/all']);
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      donatedAmount: ['', [Validators.required, Validators.min(0)]],
      //currency: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(namePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(namePattern)]],
      cardNumber: ['', [Validators.required, Validators.pattern(cardPattern)]],
      cvv: ['', [Validators.required, Validators.pattern(cvvPattern)]],
      expirationDate: ['', [Validators.required, Validators.pattern(datePattern)]]
    });
  }

  donate() {
    const donator = JSON.parse(localStorage.getItem('currentUser')!);

    this.causeService.donateToCause(this.id, this.form.value.donatedAmount).subscribe((data) => {
      this.currentAmount = Number(this.cause.raisedAmount);
      this.cause.raisedAmount = this.currentAmount + Number(this.form.value.donatedAmount);
      this.cause.donators.push(donator);
      this.hasDonated = true;
     
      this.toastr.success('You have successfully donated to the cause. Thank You!');
     });
  }
}


