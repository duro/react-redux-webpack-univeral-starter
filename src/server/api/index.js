export function register(server, options, next) {

  const api = server.select('api');

  api.route({
    method: ['GET'],
    path:'/{param*}',
    handler: (request, reply) => {
      reply('Hello World!');
    }
  })

  next()

}

register.attributes = {
  name: 'api'
}
