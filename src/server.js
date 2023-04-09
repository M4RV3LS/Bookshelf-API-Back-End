const Hapi =  require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        //port number that used by server listens on for incoming requests
        port: 9000,
        // the hostname or IP address of the server.
        host: 'localhost',
        //object that configures the server's routes which in this case enables Cross-Origin Resource Sharing (CORS) for all origins.
        routes: {
            cors: {
              origin: ['*']
            }
        }
    });

    //server.route(routes) method registers the routes defined in the routes.js module with the server.
    server.route(routes);

    //await server.start() method starts the server and listens for incoming requests
    await server.start();

    //Testing where the server launched on 
    console.log(`Server launched on ${server.info.uri}`);
}

//start the server
init();
