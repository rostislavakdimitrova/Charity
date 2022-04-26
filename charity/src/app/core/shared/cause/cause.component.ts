import { Component, Input } from '@angular/core';
import { Cause } from 'src/app/core/models/Cause';



@Component({
  selector: 'app-cause',
  templateUrl: './cause.component.html',
  styleUrls: ['./cause.component.css']
})
export class CauseComponent{

  @Input('cause') cause!: Cause;
}


