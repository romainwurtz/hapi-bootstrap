var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    chalk = require('chalk');

module.exports = function createArticle(params, next) {

    var article = new Article();

    article.title = params.title;
    article.content = params.content;

    article.save(function(err) {
        if (err) {
            console.log(chalk.red.bold("[ERROR] Article could not be saved"));
            console.log(chalk.red(err));
        }
        if (typeof next === "function") {
            next(err, article);
        }
    });
}