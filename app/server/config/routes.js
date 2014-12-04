var defaultRouteConfig = {
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
        path: '/blog/create',
        handler: require('../controllers/articles/create.article.controller'),
        config: defaultRouteConfig
    }
];
