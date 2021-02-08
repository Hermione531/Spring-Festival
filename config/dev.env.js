'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

  // API_ROOT: '"http://localhost:8080/"'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
})
