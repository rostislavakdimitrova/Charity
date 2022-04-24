import { Component, OnInit } from '@angular/core';
import { Cause } from 'src/app/core/models/Cause';
import { CauseService } from 'src/app/core/services/cause.service';

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css']
})
export class CausesComponent implements OnInit {

  causes!: Cause[];
  pageSize: number = 9;
  currentPage: number = 1;
  maxPages = 9;

  constructor(private causeService: CauseService) { }

  ngOnInit(): void {
   this.causeService.getAllCauses().subscribe((data) => {
     this.causes = data;
   })
  }

  changePage(page: any) {
    this.currentPage = page;
  }
}
