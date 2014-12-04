var Joi = require('joi');

module.exports = function(request, reply) {
    var createArticleService = request.server.methods.blog.createArticle,
        opts = {
            errors: []
        };

    if (request.method === 'post') {

        var schema = Joi.object().keys({
            title: Joi.string().required().label('Title'),
            content: Joi.string().required().label('Content')
        }), joiOptions = {
            convert: false,
            abortEarly: false
        }, data = request.payload;


        Joi.validate(data, schema, joiOptions, function (err, value) {

            if (err) {
                opts.errors = err.details;
            }

            if (opts.errors.length) {
                return reply.view('blog/create', _.merge(opts, { status: 'error' }));
            }

            createArticleService(value, function(err, article) {
                if (err) {
                    opts.errors = err.details;
                }
                opts.article = article;
                reply.view('blog/create', _.merge(opts, { status: 'success' }));
            });
        });
    }

    if (request.method === 'get' || request.method === 'head') {
        return reply.view('blog/create', opts);
    }
};