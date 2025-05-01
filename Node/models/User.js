const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    twitchId: { type: String, required: true, unique: true },
    displayName: String,
    email: String,
    profileImageUrl: String,
    accessToken: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
