const mongoose = require('mongoose');
const { Schema } = mongoose;

const rsvpSchema = new Schema({
    id_rsvp: String,
    name: String,
    phone_number: String,
    quantity: Number,
    status: String,
    deleted_at: Date,
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

module.exports = Rsvp