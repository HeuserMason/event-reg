const mongoose = require('mongoose');
const { Schema } = mongoose;
const AttendeeSchema = require('./Attendee');

const eventsSchema = new Schema({

    title: String,
    description: String,
    attendees: [AttendeeSchema],
    pricePerTicket: Number,
    startDate: Date,
    endDate: Date
});

mongoose.model('events', eventsSchema);