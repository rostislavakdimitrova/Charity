import { Cause } from './Cause';
import { Event } from './Event';

export interface User {
    _id: string,
    fullname: string,
    email: string,
    roles: string,
    donations: Cause[],
    volounteerTo: Event[]
}