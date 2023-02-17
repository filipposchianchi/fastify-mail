'use strict'
const fp = require('fastify-plugin')
const Jwt = require('@fastify/jwt')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(Jwt, { secret: process.env.JWT_SECRET })

  fastify.decorate('authenticate', onAuthenticate)  
  
  async function onAuthenticate (req, reply) {
    await req.jwtVerify()
  }
})


