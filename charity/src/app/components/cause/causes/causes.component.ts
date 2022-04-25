import { Component, OnInit } from '@angular/core';
import { Cause } from 'src/app/core/models/Cause';
import { CauseService } from 'src/app/core/services/cause.service';
import { appAnimations } from 'src/app/core/app-animations';

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css'],
  animations: appAnimations
})
export class CausesComponent implements OnInit {

  causes!: Cause[];
  isLoading: boolean = false;
  pageSize: number = 6;
  currentPage: number = 1;
  maxPages = 9;

  constructor(private causeService: CauseService) { }

  ngOnInit(): void {
    this.isLoading = true;
   this.causeService.getAllCauses().subscribe((data) => {
     this.isLoading = false;
     this.causes = data;
   })
  }

  changePage(page: any) {
    this.currentPage = page;
  }
}
