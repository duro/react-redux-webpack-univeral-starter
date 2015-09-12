import React from 'react';
import {Route} from 'react-router';
import App from 'client/views/App';
import Home from 'client/views/Home';
import About from 'client/views/About';
import Work from 'client/views/Work';
import NotFound from 'client/views/NotFound'

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/work" component={Work}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
