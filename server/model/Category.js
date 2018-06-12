const db = require('./db');

const categorySchema = db.Schema({
    title: {
        required : true,
        type : String,
        unique: true
    },
    tags: {
        type : [String] ,
        default : []
    },
    isActive: {
        required: true,
        type: Boolean
    }
});

const Category = db.model('Category', categorySchema);

module.exports = Category;