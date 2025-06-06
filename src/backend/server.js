'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes/api');
const config = require('./config/config');

const init = async () => {
    try {
        const server = Hapi.server({
            port: config.server.port,
            host: config.server.host,
            routes: {
                cors: config.cors
            }
        });

        // Register routes
        server.route(routes);

        // Error handling
        server.ext('onPreResponse', (request, h) => {
            const response = request.response;
            
            if (!response.isBoom) {
                return h.continue;
            }

            console.error('Error response:', response);

            return h.response({
                success: false,
                error: response.message,
                statusCode: response.output.statusCode
            }).code(response.output.statusCode);
        });

        await server.start();
        console.log('Server running on %s', server.info.uri);
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Routes registered:', server.table().map(route => route.path));

    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

init().catch(err => {
    console.error('Failed to initialize server:', err);
    process.exit(1);
});