export class createEventModel {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public image: string,
        public date: string,
        public time: string,
        public location: string,
        public ticketPrice: number,
        public createdAt: string,
        public owner: string,
        public volounteers: []
    ) {}
}