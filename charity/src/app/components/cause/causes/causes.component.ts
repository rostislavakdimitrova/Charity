import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cause } from 'src/app/core/models/Cause';
import { CauseService } from 'src/app/core/services/cause.service';

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css']
})
export class CausesComponent implements OnInit {

  //causes$!: Observable<Cause[]>;
  causes!: Cause[];

  constructor(private causeService: CauseService) { }

  ngOnInit(): void {
   // this.causes$ = this.causeService.getAllCauses();
   this.causeService.getAllCauses().subscribe((data) => {
     this.causes = data;
   })
  }
}
