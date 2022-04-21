import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedComponents } from '.';
import { ShortenStringPipe } from '../pipes/shorten-string.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ...sharedComponents,
    ShortenStringPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    ...sharedComponents,
    ShortenStringPipe
  ]
})
export class ShareModule { }
