import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { appAnimations } from 'src/app/core/app-animations';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: appAnimations
})
export class SigninComponent implements OnInit {

loginForm!: FormGroup;

faEnvelope = faEnvelope;
faLock = faLock;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit() {
    this.authService.login(this.loginForm.value).subscribe();
  }
}
