import Confidence from 'confidence'
import path from 'path'

var criteria = {
    env: process.env.NODE_ENV
};

var config = {

  $meta: {
    name: 'React Redux Example Development'
  },

  pkg: require('../../package.json'),

  connections: [{
    labels: ['ui'],
    host: '0.0.0.0',
    port: 3000
  },{
    labels: ['api'],
    host: '0.0.0.0',
    port: 3030
  }],

  logging : {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
  },



}

var store = new Confidence.Store(config);


exports.get = (key) => {

    return store.get(key, criteria);
};


exports.meta = (key) => {

    return store.meta(key, criteria);
};
