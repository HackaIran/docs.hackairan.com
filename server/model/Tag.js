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
    documents: {
        type: [String]
    }
});

const Tag = db.model('tag', tagSchema);

module.exports = Tag;