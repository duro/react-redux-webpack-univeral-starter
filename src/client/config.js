import Confidence from 'confidence'
import path from 'path'

var criteria = {
    nodeEnv: process.env.NODE_ENV,
    universalEnv: __CLIENT__ ? 'client' : 'server'
};

var config = {

  $meta: {
    name: 'React Redux Example Development'
  },

  isProduction: {
    $filter: 'nodeEnv',
    production: true,
    $default: false
  },

  apiPort: 3030

}

var store = new Confidence.Store(config);

exports.get = (key) => {
    return store.get(key, criteria);
};

exports.meta = (key) => {
    return store.meta(key, criteria);
};


// module.exports = {
//   development: {
//     isProduction: false,
//     port: 3000,
//     apiPort: 3030,
//     app: {
//       name: 'React Redux Example Development'
//     }
//   },
//   production: {
//     isProduction: true,
//     port: process.env.PORT,
//     apiPort: 3030,
//     app: {
//       name: 'React Redux Example Production'
//     }
//   }
// }[process.env.NODE_ENV || 'development'];
