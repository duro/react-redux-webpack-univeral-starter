import React from 'react';
import Location from 'react-router/lib/Location';
import ServerConfig from 'server/config'
import path from 'path';
import ApiClient from 'client/lib/ApiClient';
import universalRouter from 'client/lib/universalRouter';
import Html from 'client/views/Html';
import createStore from 'client/lib/redux/create';
import Boom from 'boom';

export function register(server, options, next) {

  const ui = server.select('ui');

  server.register([

    require('h2o2'),  // Include Hapi proxy handler
    require('inert')  // Include Hapi static file/folder handler

  ], (err) => {
    if (err) throw err;

    server.log(['server', 'ui', 'info'], '==> ✅  UI Plugin registered');

    // Load static assets
    ui.route({
      method: ['GET'],
      path: '/static/{file*}',
      handler: {
        directory: {
          path: path.join(__dirname, '../../../static')
        }
      }
    });

    // Load favicon
    ui.route({
      method: ['GET'],
      path: '/favicon.ico',
      handler: {
        file: path.join(__dirname, '../../../favicon.ico')
      }
    })

    // Proxy API calls to API connection
    ui.route({
      method: "*",
      path:'/api/{param*}',
      handler: {
        proxy: {
          host: 'localhost',
          port: 3030,
          protocol: 'http',
          passThrough: true
        }
      }
    });

    // UI Handler
    ui.route({
      method: "*",
      path:'/{param*}',
      handler: (request, reply) => {
        if (__DEVELOPMENT__) {
          // Do not cache webpack stats: the script file would change since
          // hot module replacement is enabled in the development env
          webpackIsomorphicTools.refresh();
        }

        const client = new ApiClient(request);
        const store = createStore(client);
        const location = new Location(request.path, request.query);

        if (__DISABLE_SSR__) {
          reply('<!doctype html>\n' +
            React.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div/>} store={store}/>));
        } else {
            universalRouter(location, undefined, store)
              .then(({component, transition, isRedirect}) => {
                if (isRedirect) {
                  reply.redirect(transition.redirectInfo.pathname);
                  return;
                }

                const html = '<!doctype html>\n' +
                  React.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>)

                reply(html);
              })
              .catch((error) => {
                if (error.redirect) {
                  reply.redirect(error.redirect);
                  return;
                }
                server.log(['server','router', 'error'], pretty.render(error));
                reply(Boom.wrap(error));
              });
        }
      }
    });

    next()

  })

}

register.attributes = {
  name: 'ui'
}
