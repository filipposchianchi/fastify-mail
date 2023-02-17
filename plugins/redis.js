'use strict'
const fp = require('fastify-plugin')
const redis = require('@fastify/redis')

module.exports = fp(async function (fastify, opts) {
  fastify.register(redis, { 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  })
})