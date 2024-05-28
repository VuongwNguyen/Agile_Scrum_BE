const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    fullname: String,
    password: String,
    email: String,
    phonenumber: String,
    address: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'customer']
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    avatar: {
        type: String,
        default: null
    },
}, { collection: 'Account', timestamps: true});

module.exports = mongoose.model('Account', accountSchema);



