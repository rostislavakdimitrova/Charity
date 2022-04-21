import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id!: string;
  user!: User;
  isDisplay!: boolean;

  constructor(private authService: AuthService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    //const currentUserId = JSON.parse(localStorage.getItem('currentUser')!)._id; 
    this.authService.getProfile(this.id).subscribe((data) => {
      this.user = data;
      console.log(data);
    });
  }
}
