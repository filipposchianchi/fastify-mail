'use strict'
const fp = require('fastify-plugin')
const { Worker } = require('bullmq');

module.exports = fp(async function (fastify, opts) {
  function sendEmail(job) {
    const { email, message } = job.data;

    fastify.mailer.sendMail({
      to: email,
      subject: 'example',
      text: message
    })

    console.log(`Message ${message} was sent to ${email}.`)
    return {message: 'ok'}
  }
  const worker = new Worker('emailSchedule', sendEmail);
})

