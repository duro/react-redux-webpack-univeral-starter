export function register(server, options, next) {

  const ui = server.select('ui');

  ui.route({
    method: ['GET'],
    path:'/{param*}',
    handler: (request, reply) => {
      reply('Hello World!');
    }
  })

  next()

}

register.attributes = {
  name: 'ui'
}
