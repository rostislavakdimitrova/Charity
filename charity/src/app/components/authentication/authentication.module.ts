import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/core/shared/share.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ...authComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    ShareModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  providers:[],
})
export class AuthenticationModule { }
