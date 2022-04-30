import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const authenticationRoutes: Routes = [
    { path: '', component: SigninComponent, pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];


export const AuthenticationRoutingModule = RouterModule.forChild(authenticationRoutes);