'use strict'
const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {
  const { httpErrors, jwt } = fastify

  fastify.route({
    method: 'POST',
    path: '/login',
    schema: {
      body: S.object()
        .prop('username', S.string().required())
        .prop('password', S.string().minLength(6).required())
        .additionalProperties(false)// if we have more values these will be ignored during the parsing
    },
    handler: onLogin
  })

  async function onLogin (req, reply) {
    const { username, password } = req.body

    const user = await fastify.db.query(
      `select * from users where username = ?`, [username]
    )
    const pwdCrypt = user[0][0].password

    const isValidPassword = await fastify.bcrypt.compare(password, pwdCrypt);

    if(!isValidPassword) {
      //sensinble plugin add status code for unauthorized request
      throw httpErrors.unauthorized('Bad username or password')
    }

    const token = jwt.sign({ username })

    reply.code(200)
    return{ token: token }
  }
}
