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
const searchEvent = 'http://localhost:3000/event/search';


@Injectable({
  providedIn: 'root'
})
export class CharityEventService {

  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(getAllEvents);
  }

  /*getSingleEvent(id: string): Observable<Event> {
    return this.httpClient.get<Event>(getSingleEvent + id);
  }*/

  createEvent(body: createEventModel): Observable<Event> {
    return this.httpClient.post<Event>(createEvent, body);
  }

  getEventDetails(id: string): Observable<Event> {
    return this.httpClient.get<Event>(getSingleEvent + 'details/' + id);
  }

  updateEvent(id: string, body: Event): Observable<Event> {
    return this.httpClient.put<Event>(editEvent + id, body);
  }

  deleteEvent(id: string) {
    return this.httpClient.delete(deleteEvent + id);
  }

  volounteerToEvent(id: string) {
    return this.httpClient.post<Event>(volounteerToEvent + id, {});
  }

  searchEvent(query: string) {
    return this.httpClient.get<Event[]>(searchEvent + query);
  }
}
