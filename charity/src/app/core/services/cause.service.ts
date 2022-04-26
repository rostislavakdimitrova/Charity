import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cause } from '../models/Cause';
import { createCauseModel } from '../models/create-cause';

const getAllCauses = 'http://localhost:3000/cause/all';
const createCause = 'http://localhost:3000/cause/create';
const getSingleCause = 'http://localhost:3000/cause/';
const editCause = 'http://localhost:3000/cause/edit/';
const deleteCause = 'http://localhost:3000/cause/delete/';
const donateToCause = 'http://localhost:3000/cause/donate/';
const getLastThreeCauses = 'http://localhost:3000/cause/getLastThree';


@Injectable({
  providedIn: 'root'
})
export class CauseService {

  constructor(private httpClient: HttpClient) { }

  getAllCauses(): Observable<Cause[]> {
    return this.httpClient.get<Cause[]>('cause/all');
  }

  createCause(body: createCauseModel): Observable<Cause> {
    return this.httpClient.post<Cause>('cause/create', body);
  }

  getCauseDetails(id: string): Observable<Cause> {
    return this.httpClient.get<Cause>('cause/details/' + id);
  }

  updateCause(id: string, body: Cause): Observable<Cause> {
    return this.httpClient.put<Cause>('cause/edit/' + id, body);
  }

  deleteCause(id: string) {
    return this.httpClient.delete('cause/delete/' + id);
  }

  donateToCause(id: string, donatedAmount: number) {
    return this.httpClient.post<Cause>('cause/donate/' + id, { donatedAmount });
  }

  getLastThree(query: string) {
    return this.httpClient.get<Cause[]>('cause/getLastThree' + query);
  }

}
