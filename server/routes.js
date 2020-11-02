const models = require("./models")
module.exports = (app, models) => {
  app.get('/api/gifts', async (req, res) => {
    try {
      const gifts = await models.gift.findAll()
      res.status(200).json(gifts)
    } catch (err) {
      res.status(500).send(err)
    }
  })
}
