import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  
  searchQuery = new Subject<string>();

  constructor() { }

}