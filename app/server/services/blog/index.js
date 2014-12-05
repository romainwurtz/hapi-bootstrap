"use strict";

exports.register = function(service, options, next) {
    service.method('blog.createArticle', require('./methods/createArticle'));
    service.method('blog.listArticle', require('./methods/listArticle'));
    next();
};

exports.register.attributes = {
    name: 'hapi-bootstrap-blog',
    version: '1.0.0'
};