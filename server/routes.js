const models = require('./models')
const mailer = require('./mailer')

module.exports = (app) => {
  app.get('/api/gifts', async (req, res) => {
    try {
      const gifts = await models.gift.findAll()
      const shuffledGifts = shuffle(gifts)
      res.status(200).json(shuffledGifts)
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
        await gift.update({ claimed: true, gifter: email })
      }
      mailer.send(gifts, email, name)
      res.sendStatus(201)
    } catch (error) {
      res.sendStatus(503)
    }
  })
}
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
