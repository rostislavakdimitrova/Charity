const { model, Schema, Types: {ObjectId} } = require('mongoose');


const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    owner: { type: ObjectId, ref: 'User' },
    volounteers: { type: [ObjectId], ref: 'User', default: [] }
});


const Event = model('Event', eventSchema);

module.exports = Event;