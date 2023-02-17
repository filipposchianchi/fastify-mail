'use strict'
const fp = require('fastify-plugin')
const mailer = require('fastify-mailer')

module.exports = fp(async function (fastify, opts) {
  fastify.register(mailer, {
    defaults: { from: ' <test+sender@example.com' },
    transport: {
      host: process.env.SENDGRID_HOST,
      secure: true, // use TLS
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    }
  })
})