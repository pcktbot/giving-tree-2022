require('dotenv').config()
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const config = require('../nuxt.config.js')
const models = require('./models')
require('./routes')(app, models)
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server

  await nuxt.ready()
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)
  models.sequelize
    .sync()
    .then(() => console.log('Database Synced'))
  app.listen(port, host)
  console.log(`Server listening on http://${host}:${port}`)
}
start()
