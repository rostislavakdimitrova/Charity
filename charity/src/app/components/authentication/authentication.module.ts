import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ShareModule } from 'src/app/core/shared/share.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
  declarations: [
    ...authComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    ShareModule
  ],
  providers:[],
})
export class AuthenticationModule { }
