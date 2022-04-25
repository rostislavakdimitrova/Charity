import { Component, OnInit } from '@angular/core';
import { appAnimations } from 'src/app/core/app-animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: appAnimations
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
