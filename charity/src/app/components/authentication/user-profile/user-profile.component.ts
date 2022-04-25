import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { appAnimations } from 'src/app/core/app-animations'; 
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations: appAnimations
})
export class UserProfileComponent implements OnInit {

  id!: string;
  user!: User;
  isLoading = false;

  constructor(private authService: AuthService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;; 
    this.authService.getProfile(this.id).subscribe((data) => {
      this.isLoading = false;
      this.user = data;
      console.log(data);
    });
  }
}
