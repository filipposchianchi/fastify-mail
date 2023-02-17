'use strict'

const fp = require('fastify-plugin')
const mysql = require('mysql2/promise')

const CONNECTION_STRING = process.env.DB_URL

module.exports = fp(async function (fastify, opts) {
  const db = await mysql.createConnection(CONNECTION_STRING)

  fastify.decorate('db', db)

  fastify.addHook('onClose', async function () {
    return db.end()
  })

    console.log(`Database connected to "${db.connection.config.host}:${db.connection.config.port}" `)
})