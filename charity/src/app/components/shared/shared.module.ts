import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedComponent } from '.';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ...sharedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...sharedComponent
  ]
})
export class SharedModule { }
