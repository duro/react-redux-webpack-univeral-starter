/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Location from 'react-router/lib/Location';
import queryString from 'query-string';
import createStore from 'client/lib/redux/create';
import ApiClient from 'client/lib/ApiClient';
import universalRouter from 'client/lib/universalRouter';
import Immutable from 'immutable';

let serializedState = window.__data;

// Rehydrate serialized state into Immutable objects
Object
  .keys(serializedState)
  .forEach(key => {
    serializedState[key] = Immutable.fromJS(serializedState[key]);
   });

const history   = new BrowserHistory();
const client    = new ApiClient();

const dest      = document.getElementById('content');
const store     = createStore(client, serializedState);
const search    = document.location.search;
const query     = search && queryString.parse(search);
const location  = new Location(document.location.pathname, query);

universalRouter(location, history, store)
  .then(({component}) => {
    if (__DEVTOOLS__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

      console.info('You will see a "Warning: React attempted to reuse markup in a container but the checksum was' +
        ' invalid." message. That\'s because the redux-devtools are enabled.');

      React.render(<div>
        {component}
        <DebugPanel top right bottom key="debugPanel">
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      </div>, dest);
    }

    else {
      React.render(component, dest);
    }
  }, (error) => {
    console.error(error);
  });


if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  const reactRoot = window.document.getElementById('content');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
