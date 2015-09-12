import ServerConfig from 'server/config'

export function register(server, options, next) {

  const api = server.select('api');

  api.route({
    method: ['GET'],
    path:'/api/work',
    handler: (request, reply) => {
      reply([
        {id: 1, name: 'Pledgeling', description: 'Pledgeling was an awesome project'},
        {id: 2, name: 'Outerknown', description: 'Outerknown was an awesome project'},
        {id: 3, name: 'Yappa', description: 'Yappa was an awesome project'},
        {id: 4, name: 'BFA', description: 'BFA was an awesome project'}
      ]);
    }
  })

  next();

}

register.attributes = {
  name: 'work'
}
