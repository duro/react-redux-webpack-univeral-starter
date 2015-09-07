import Glue from 'glue'
import Manifest from 'server/manifest'
import ServerConfig from 'server/config'

const composeOptions = {
    relativeTo: __dirname
};

const Composer = module.exports = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions);

Composer((err, server) => {
  if (err) throw err;

  server.log(['server', 'info'], '==> ✅  Server is composed');

  server.start(() => {
    server.log(['server', 'info'], '==> ✅  Server is started');

    const ui = server.select('ui');
    const api = server.select('api');

    server.log(['server', 'info'], `==> 🌎  ${ ServerConfig.meta('/').name } running on port ${ ui.info.port }, API on port ${ api.info.port }`);

  });
})
