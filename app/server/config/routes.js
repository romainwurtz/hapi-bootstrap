var config = require('./settings'),
    defaultRouteConfig = {
    security: {
        xframe: true,
        xss: true,
        noSniff: true,
        hsts: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            includeSubdomains: true
        }
    }
};

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('../controllers/default/homepage.controller'),
        config: defaultRouteConfig
    },
    {
        method: 'GET',
        path: '/blog/list',
        handler: require('../controllers/articles/list.article.controller'),
        config: defaultRouteConfig
    },
    {
        method: ['GET', 'POST'],
        path: '/blog/create',
        handler: require('../controllers/articles/create.article.controller'),
        config: defaultRouteConfig
    },
    {
        method: 'GET',
        path: '/assets/{path*}',
        handler: {
            directory: {
                path: config.rootPath + '../public/assets',
                listing: false,
                index: false
            }
        }
    },
];
