"use strict";

var Joi = require('joi'),
    Hoek = require('hoek');

module.exports = function(request, reply) {
    var createArticleService = request.server.methods.blog.createArticle,
        opts = {
            action: {
                errors: [],
                status: null
            },
            page: {
                current: 'blogCreate'
            }
        };

    if (request.method === 'post') {

        var schema = Joi.object().keys({
            title: Joi.string().required().label('Title'),
            body: Joi.string().required().label('Body')
        }), joiOptions = {
            convert: false,
            abortEarly: false
        }, data = request.payload;


        Joi.validate(data, schema, joiOptions, function (err, value) {

            if (err) {
                opts.action.errors = err.details;
                return reply.view('blog/create', Hoek.applyToDefaults(opts, { action: { status: 'error' } }));
            }

            createArticleService(value, function(err, article) {
                if (err) {
                    opts.action.errors = err.details;
                    return reply.view('blog/create', Hoek.applyToDefaults(opts, { action: { status: 'error' } }));
                }
                opts.article = article;
                reply.view('blog/create', Hoek.applyToDefaults(opts,
                    { action: { status: 'success', message: 'You successfully posted this article.'} }
                ));
            });
        });
    }

    if (request.method === 'get' || request.method === 'head') {
        return reply.view('blog/create', opts);
    }
};