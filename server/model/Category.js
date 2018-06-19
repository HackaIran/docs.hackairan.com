const db = require('./db');

const categorySchema = db.Schema({
    title: {
        required : true,
        type : String,
    },
    isActive: {
        required: true,
        type: Boolean,
        default: true
    }
});

const Category = db.model('Category', categorySchema);

module.exports = Category;