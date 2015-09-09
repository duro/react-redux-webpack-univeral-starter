import ServerConfig from 'server/config'

export function register(server, options, next) {

  // console.log(ServerConfig);
  // const api = server.connection(ServerConfig.get('/api/connection'))
  const api = server.select('api');

  api.route({
    method: ['GET'],
    path:'/api/people',
    handler: (request, reply) => {
      reply([
        {id: 1, name: 'Adam Duro', title: 'Technology Director'},
        {id: 2, name: 'Michael Kucera', title: 'Managing Director'},
        {id: 3, name: 'Matt Zehner', title: 'CEO'},
        {id: 4, name: 'Mick McCarthy', title: 'Creative Director'}
      ]);
    }
  })

  next();

}

register.attributes = {
  name: 'people'
}
