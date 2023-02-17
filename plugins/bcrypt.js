'use strict'
const fp = require('fastify-plugin')
const bcrypt = require('fastify-bcrypt')

module.exports = fp(async function (fastify, opts) {
  fastify.register(bcrypt, {
    saltWorkFactor: 12
  })
})
