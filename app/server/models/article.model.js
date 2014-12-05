"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    chalk = require('chalk');

var ArticleSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    body: {
        type: String,
        default: '',
        trim: true
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

ArticleSchema.pre('save', function(next) {
    console.log(chalk.green("[NOTICE] Article saved"));
    next();
});

mongoose.model('Article', ArticleSchema);