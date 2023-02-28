const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({

    eventId: String,
    name: String,
    email: String,
    phoneNumber: String,
    createdDate: Date
});

mongoose.model('token', tokenSchema);