const models = require("./models")
module.exports = (app) => {
  app.get('/api/gifts', async (req, res) => {
    try {
      const gifts = await models.gift.findAll()
      res.status(200).json(gifts)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.post('/api/claim', async (req, res) => {
    try {
      const { name, email, gifts } = req.body
      const gifter = await models.gifter.findOrCreate({
        where: { email },
        defaults: { name, email }
      })
      for (let i = 0; i < gifts.length; i++) {
        const gift = await models.gift.findOne({ where: { id: gifts[i].id } })
        await gift.update({ claimed: true })
      }
      res.sendStatus(201)
    } catch (error) {
      res.sendStatus(503)
    }
  })
}
