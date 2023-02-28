const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendeeSchema = new Schema({

    name: String,
    email: String,
    phoneNumber: String,
    dateApplied: Date
});

module.exports = attendeeSchema;