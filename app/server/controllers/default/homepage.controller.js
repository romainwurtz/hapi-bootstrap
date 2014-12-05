"use strict";

module.exports = function(request, reply) {
    return reply.view('index', {page: {
        current: 'index'
    }});
};