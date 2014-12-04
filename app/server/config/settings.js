/**
 * Config settings
 */

var path = require('path'),
    program = require('commander'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    helpers = require('handlebars-helpers');

program.option('-p, --port <n>', 'Custom HTTP port').parse(process.argv);
helpers.register(handlebars, {}, {});

var options = {
    rootPath: path.normalize(__dirname + '/../'),
    db: {
        mongoUrl: ''
    },
    server: {}
};

options.server.connections = {
    port:  8080,
    router: {
        stripTrailingSlash: true
    }
};


options.server.views = {
    engines: {
        hbs: handlebars
    },
    path: options.rootPath + 'views/',
    helpersPath: options.rootPath + 'views/helpers',
    layoutPath: options.rootPath + 'views/layouts',
    partialsPath: options.rootPath + 'views/partials',
    layout: 'default',
    layoutKeyword: 'hapiContent',
    isCached: false
};

if (process.env.MONGOHQ_URL) {
    options.db.mongoUrl = process.env.MONGOHQ_URL;
}

if (program.port) {
    options.server.connections.port = parseInt(program.port, 10);
} else if (process.env.PORT) {
    options.server.connections.port = parseInt(process.env.PORT, 10);
}

module.exports = options;