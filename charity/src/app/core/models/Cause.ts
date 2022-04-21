import { User } from './User';

export interface Cause {
    _id: string,
    title: string,
    description: string,
    neededAmount: Number,
    raisedAmount: Number,
    image: string,
    createdAt: string,
    owner: string,
    donators: User[],
}