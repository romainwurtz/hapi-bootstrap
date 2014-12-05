"use strict";

var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    chalk = require('chalk');

module.exports = function(next) {
    Article.find().sort('-created').exec(function(err, articles) {
        if (err) {
            console.log(chalk.red.bold("[ERROR] Articles could not be found"));
            console.log(chalk.red(err));
        }

        if (typeof next === "function") {
            next(err, articles);
        }
    });
}