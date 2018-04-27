const db = require('./db');

const categorySchema = db.Schema({
    title : {
        required : true,
        type : String
    },
    tags : {
        type : [String] ,
        default : []
    }
});

const Category = db.model('Category', categorySchema);

module.exports = Category;