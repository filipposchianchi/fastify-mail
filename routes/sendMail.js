'use strict'
const { Queue } = require('bullmq')

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    path: '/send-mail',
    onRequest: [fastify.authenticate],
    handler: addJob
  })
  
  async function addJob(req, reply) {

    const myQueue = new Queue('emailSchedule');

    async function emailSchedule(email, message) {
      await myQueue.add('email', { email, message });
    }
    emailSchedule("test@test,com", "Hello World!");

    reply.code(200)
    return {
      message: "scheduled job" 
    }
  }

}
