import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { appAnimations } from 'src/app/core/app-animations'; 
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


const nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: appAnimations
})
export class SignupComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname : ['', [Validators.required, Validators.pattern(nameRegex)]],
      email : ['', [Validators.required, Validators.pattern(emailRegex)]],
      password : ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit(): void {
      this.authService.register(this.registerForm.value).subscribe();
    }
}
