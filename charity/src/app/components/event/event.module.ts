import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { eventComponents } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { EventRoutingModule } from './event-routing.module';
import { ShareModule } from 'src/app/core/shared/share.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    ...eventComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventRoutingModule,
    ShareModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers:[],
  exports: []
})
export class EventModule { }