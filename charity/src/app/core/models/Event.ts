import { User } from './User';

export interface Event {
    _id: string,
    title: string,
    description: string,
    image: string,
    date: string,
    time: string,
    location: string,
    ticketPrice: number,
    createdAt: string,
    owner: string,
    volounteers: User[]
};