const db = require('./db');

const tagSchema = db.Schema({
    tagName: {
        required: true,
        type: String,
        unique: true
    },
    isActive: {
        required: true,
        type: Boolean,
        default: true
    },
    usedCount: {
        required: true,
        type: Number,
        default: 0
    }
});

const Tag = db.model('tag', tagSchema);

module.exports = Tag;