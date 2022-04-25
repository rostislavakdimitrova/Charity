import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedComponent } from '.';
//import { AppRoutingModule } from 'src/app/app-routing.module';
//import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ...sharedComponent
  ],
  imports: [
    CommonModule,
    //AppRoutingModule,
    RouterModule,
    //ReactiveFormsModule
  ],
  exports: [
    ...sharedComponent
  ]
})
export class SharedModule { }
