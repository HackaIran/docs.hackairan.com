const db = require('./db');

const documentSchema = db.Schema({
    name: {
        required: true,
        type: String
    },
    text: {
        required: true,
        type: String
    },
    creator: {
        required: true,
        type: db.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        required: true,
        type: db.Schema.Types.ObjectId,
        ref: "Category"
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        required: true,
        type: Date,
        default: Date.now()
    }
});

const Document = db.model('Document', documentSchema);

module.exports = Document;