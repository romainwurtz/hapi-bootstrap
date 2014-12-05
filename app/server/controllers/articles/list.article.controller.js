"use strict";

var Hoek = require('hoek');

module.exports = function(request, reply) {
    var listArticleService = request.server.methods.blog.listArticle,
        opts = {
            errors: [],
            page: {
                current: 'blogList'
            }
        };

    if (request.method === 'get' || request.method === 'head') {
        listArticleService(function(er, articles) {
            reply.view('blog/list', Hoek.applyToDefaults(opts, { articles: articles }));
        });
    }

};