export class createCauseModel {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public neededAmount: number,
        public image: string,
        public createdAt: string,
        public owner: string,
        public donators: []
    ) {}
}