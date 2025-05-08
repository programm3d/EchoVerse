const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String, // Could be restricted to valid emojis/tags
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically assigns creation date
    },
    unlockAt: {
        type: Date,
        required: true
    },
    isUnlocked: {
        type: Boolean,
        default: false
    },
    cloudinaryPublicId: {
        type: String
    }
});

const entryModel = mongoose.model('Entry', entrySchema);

module.exports = entryModel;
