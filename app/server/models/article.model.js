/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    chalk = require('chalk');

/**
 * User Schema
 */
var ArticleSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
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

/**
 * Hook a pre save method to hash the password
 */
ArticleSchema.pre('save', function(next) {
    console.log(chalk.green("[NOTICE] Article saved"));
    next();
});

mongoose.model('Article', ArticleSchema);