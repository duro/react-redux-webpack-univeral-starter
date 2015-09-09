import ServerConfig from 'server/config'

export function register(server, options, next) {

  const api = server.select('api');

  server.register([

    require('./hello'),
    require('./people'),

  ], (err) => {
    if (err) throw err;

    server.log(['server', 'api', 'info'], '==> ✅  API Plugin registered');

    next();
  })

}

register.attributes = {
  name: 'api'
}
