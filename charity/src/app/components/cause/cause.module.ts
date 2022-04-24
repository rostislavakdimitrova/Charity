import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { causeComponents } from '.';
import { CauseRoutingModule } from './cause-routing.module';
import { ShareModule } from 'src/app/core/shared/share.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ...causeComponents,
  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CauseRoutingModule,
    ShareModule,
    MatProgressBarModule,
    NgxPaginationModule
  ],
  providers: [],
  exports: []
})
export class CauseModule { }
