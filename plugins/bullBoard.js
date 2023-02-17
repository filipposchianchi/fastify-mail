const fp = require('fastify-plugin')
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { FastifyAdapter } = require('@bull-board/fastify');
const { Queue } = require('bullmq');

module.exports = fp(async function (fastify, opts) {
  const redisOptions = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  };
  
  const createQueueMQ = (name) => new Queue(name, { connection: redisOptions });
  
  const run = async () => {
    const exampleBullMq = createQueueMQ('emailSchedule');  
  
    const serverAdapter = new FastifyAdapter();
  
    createBullBoard({
      queues: [new BullMQAdapter(exampleBullMq)],
      serverAdapter,
    });
  
    serverAdapter.setBasePath('/ui');
    fastify.register(serverAdapter.registerPlugin(), { prefix: '/ui' });
    
    /* eslint-disable no-console */
    console.log('Running on 3000...');
    console.log('For the UI, open http://localhost:3000/ui');
    console.log('Make sure Redis is running on port 6379 by default');
  };
  
  run().catch((e) => {
    //* eslint-disable no-console */
    console.error(e);
    process.exit(1);
  });
  
})