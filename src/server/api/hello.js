import ServerConfig from 'server/config'

export function register(server, options, next) {

  // console.log(ServerConfig);
  // const api = server.connection(ServerConfig.get('/api/connection'))
  const api = server.select('api');

  api.route({
    method: ['GET'],
    path:'/api/hello',
    handler: (request, reply) => {
      reply('Hello World!');
    }
  })

  next();

}

register.attributes = {
  name: 'hello'
}
