'use strict';

const passwordHash = require('password-hash');//TODO=> Use an async option
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required.',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    firstName: {
        type: String,
        trim: true,
        required: 'First Name is required.',
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last Name is required.',
    },
    password: {
        type: String,
        required: 'Password is required.',
        set: (password) => {
            return passwordHash.generate(password);
        }
    },
    admin: {
        type: Boolean,
        default: false
    }
}));