const mailer = require('@sendgrid/mail')
const {
  SENDGRID_API_KEY: key,
  SENDGRID_FROM_EMAIL: fromEmail
} = process.env

mailer.setApiKey(key)

function createGiftTemplate(gifts, toName) {
  let html = `
    <h1>Hi, ${toName}! Here are the gifts you selected.</h1>
    <i>Thank you for participating in G5's 2020 Virtual Giving Tree! Please be sure to purchase your gift(s) by 12/11 and include this printed or written information with your gift(s) upon drop off/pick up.</i>
  `
  gifts.forEach((gift) => {
    const options = gift.options ? JSON.stringify(gift.options) : ''
    html = html + `
      <p>id: ${gift.id}</p>
      <strong>${gift.name}</strong>
      <p>${gift.description}</p>
      <p>${options}</p>
      <hr>
    `
  })
  console.log(html)
  return html
}

module.exports = {
  send(gifts, toEmail, toName) {
    try {
      mailer.send({
        to: toEmail,
        from: {
          email: fromEmail,
          name: 'G5 Giving Tree'
        },
        subject: 'Giving Tree Selections',
        html: createGiftTemplate(gifts, toName)
      }).then(res => console.log(res))
    } catch (error) {
      console.error(error)
    }
  }
}
