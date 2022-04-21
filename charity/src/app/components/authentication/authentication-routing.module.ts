import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const authenticationRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'signin' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'profile/:id', component: UserProfileComponent }
];


export const AuthenticationRoutingModule = RouterModule.forChild(authenticationRoutes);