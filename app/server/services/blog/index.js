exports.register = function(service, options, next) {
    service.method('blog.createArticle', require('./methods/createArticle'));
    next();
};

exports.register.attributes = {
    name: 'hapi-bootstrap-blog',
    version: '1.0.0'
};