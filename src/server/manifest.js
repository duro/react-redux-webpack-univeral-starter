import Confidence from 'confidence'
import AppConfig from './config'
import path from 'path'
import GoodConsole from 'good-console'

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  $meta: 'Our main server manifest',
  server: {},
  connections: AppConfig.get('/connections'),
  plugins: {
    'good': AppConfig.get('/logging'),
    './ui': {},
    './api': {}
  }
};


const store = new Confidence.Store(manifest);


exports.get = (key) => {
  return store.get(key, criteria);
};


exports.meta = (key) => {
  return store.meta(key, criteria);
};
