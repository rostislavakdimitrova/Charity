import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEventModel } from '../models/create-event';
import { Event } from '../models/Event';


const getAllEvents = 'http://localhost:3000/event/all';
const createEvent = 'http://localhost:3000/event/create';
const getSingleEvent = 'http://localhost:3000/event/';
const editEvent = 'http://localhost:3000/event/edit/';
const deleteEvent = 'http://localhost:3000/event/delete/';
const volounteerToEvent = 'http://localhost:3000/event/volounteer/';
const getLastThreeEvents = 'http://localhost:3000/event/getLastThree';


@Injectable({
  providedIn: 'root'
})
export class CharityEventService {

  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>('event/all');
  }

  createEvent(body: createEventModel): Observable<Event> {
    return this.httpClient.post<Event>('event/create', body);
  }

  getEventDetails(id: string): Observable<Event> {
    return this.httpClient.get<Event>('event/details/' + id);
  }

  updateEvent(id: string, body: Event): Observable<Event> {
    return this.httpClient.put<Event>('event/edit/' + id, body);
  }

  deleteEvent(id: string) {
    return this.httpClient.delete('event/delete/' + id);
  }

  volounteerToEvent(id: string) {
    return this.httpClient.post<Event>('event/volounteer/' + id, {});
  }

  getLastThree(query: string) {
    return this.httpClient.get<Event[]>('event/getLastThree' + query);
  }
}
