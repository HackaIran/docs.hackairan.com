const db = require('./db');
const validate = require('mongoose-validator');


const summaryValidator = [
    validate({
      validator: 'isLength',
      arguments: [50, 250],
      message: 'Name should be between 50 and 250 characters'
    })
  ];

const uniqueUrlValidator = [
    validate({
      validator: 'isLength',
      arguments: [5, 25],
      message: 'Url should be between 5 and 25 characters'
    }),
    validate({
        validator: value => value.split(' ').length < 2,
        message: 'Spaces are not expected in url',
    })
  ];
  

const documentSchema = db.Schema({
    name: {
        required: true,
        type: String
    },
    text: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: db.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        required: true,
        type: db.Schema.Types.ObjectId,
        ref: "Category"
    },
    summary: {
        required: true,
        type: String,
        validate: summaryValidator
    },
    uniqueUrl:{
        required: true,
        type: String,
        unique: true,
        validate: uniqueUrlValidator
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