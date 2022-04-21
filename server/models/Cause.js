const { model, Schema, Types: {ObjectId} } = require('mongoose');


const causeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    neededAmount: { type: Number, required: true },
    raisedAmount: {type: Number, default: 0 },
    image: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    owner: { type: ObjectId, ref: 'User' },
    donators: { type: [ObjectId], ref: 'User', default: [] }
});


const Cause = model('Cause', causeSchema);

module.exports = Cause;