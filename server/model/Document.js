const db = require('./db');
const validate = require('mongoose-validator');


const summaryValidator = [
    validate({
      validator: 'isLength',
      arguments: [30, 250],
      message: 'Summary should be between 30 and 250 characters'
    })
  ];

const uniqueUrlValidator = [
    validate({
      validator: 'isLength',
      arguments: [5, 40],
      message: 'Url should be between 5 and 40 characters'
    }),
    validate({
        validator: value => value.split(' ').length < 2,
        message: 'Spaces are not expected in url',
    })
  ];
  

const documentSchema = db.Schema({
    name: {
        required: [true, 'Title field is required for a document. please fill it.'],
        type: String
    },
    text: {
        required: [true, 'Content is required for a document. please fill it.'],
        type: String
    },
    author: {
        required: [true, 'Who are you?!?! and how did you get here :))))))'],
        type: db.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        required: [true, 'Category is required for a document. please fill it.'],
        type: db.Schema.Types.ObjectId,
        ref: "Category"
    },
    summary: {
        required: [true, 'Summary field is required for a document. please fill it.'],
        type: String,
        validate: summaryValidator
    },
    uniqueUrl:{
        required: [true, 'UniqueUrl field is required for a document. please fill it.'],
        type: String,
        unique: true,
        validate: uniqueUrlValidator
    },
    createdAt: {
        required: [true, 'What Tha fak happened just now?'],
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        required: [true, 'What Tha fak happened just now?'],
        type: Date,
        default: Date.now()
    },
    isActive: {
        required: [true, 'What Tha fak happened just now?'],
        type: Boolean,
        default: true
    },
    tags: {
        type : [String] ,
        default : []
    }
});

const Document = db.model('Document', documentSchema);

module.exports = Document;