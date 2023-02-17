'use strict'
const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    path: '/',
    onRequest: [fastify.authenticate],
    handler: onRoot
  })
  
  async function onRoot(req, reply) {
    console.log(fastify.someSupport())
    reply.code(200).send({hello: 'Team Backend'})

  }

//routes for test redis
  fastify.route({
    method: 'GET',
    path: '/get-foo',
    handler: getFoo
  })
  async function getFoo(req, reply) {
    const { redis } = fastify
    await redis.get("key", (err, val) => {
      reply.send(err || val)
    })
  }

  fastify.route({
    method: 'POST',
    path: '/post-foo',
    handler: postFoo
  })
  async function postFoo(req, reply) {
    const { redis } = fastify
    await redis.set("key", "value", (err) => {
      reply.send(err || { status: 'ok' })
    })
  }

}
