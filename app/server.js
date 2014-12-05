var Hapi = require('hapi'),
    config = require('./server/config/settings'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    glob = require('glob'),
    path = require('path');


// Bootstrap db connection
var db = mongoose.connect(config.db.mongoUrl, function (err) {
    if (err) {
        console.error(chalk.red('[ERROR] Could not connect to MongoDB!'));
        console.log(chalk.red(err));
        process.exit(1);
    }
});

// Bootstrap models
var models = glob.sync(config.rootPath + "models/**/*.js");
models.forEach(function (modelPath) {
    require(path.resolve(modelPath));
});

// Create a server with all the needed options
var server = new Hapi.Server();
server.connection(config.server.connections);
server.views(config.server.views);

module.exports = server;

var plugins = require(config.rootPath + 'adapters/plugins');
server.register(plugins, function (err) {
    if (err) {
        throw err;
    }
    // setup routes
    server.route(require(config.rootPath + 'config/routes'));
    // let's go!
    server.start(function () {
        console.log(chalk.green("[NOTICE] Server started at: " + server.info.uri));
    });
});

