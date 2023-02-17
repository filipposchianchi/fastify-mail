# FASTIFY-MAIL
This is a personal project done just to learn how it works Fastify framework.

This application exposes REST apis to:
-login and auth system using JWT.
-send mail (using nodemailer and sendgrid as SMTP email server) adding a job to a queue system. 

Technologies used:
-fastify
-bullMQ to implent queue system
-bullBoard dashboard to visualize queues and their jobs
-mariadb Database
-caching with Redis

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
