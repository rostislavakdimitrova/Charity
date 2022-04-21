import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Validation from 'src/app/core/validators/match-validation';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
  emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  registerForm!: FormGroup;
 /* passwordControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerForm.controls['passwords'] as FormGroup;
  }

  registerForm: FormGroup = this.fb.group({
    fullname: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+\s[A-Z][a-z]+/)]),
    email: new FormControl ('', [Validators.required, Validators.pattern(this.emailRegex)]),
    passwords: new FormGroup({
      password: this.passwordControl,
      confirmPassword: new FormControl('', [Validators.required, passwordMatch(this.passwordControl)])
    })
  });*/

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname : ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      email : ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password : ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword : ['', [Validators.required]]
    },
    { validators: [Validation.match('password', 'confirmPassword')]});
  }

  submit(): void {
    this.authService.register(this.registerForm.value).subscribe();//(() => {
     
      //this.router.navigate(['/signin']);
   // });
  }

}
