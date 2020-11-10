const mailer = require('@sendgrid/mail')
const {
  SENDGRID_API_KEY: key,
  SENDGRID_FROM_EMAIL: fromEmail
} = process.env

mailer.setApiKey(key)

function createGiftTemplate(gifts, toName) {
  let html = `<h1>Hi, ${toName}! Here are the gifts you selected.</h1>`
  gifts.forEach((gift) => {
    html = html + `
      <strong>${gift.name}</strong>
      <p>${gift.description}</p>
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
      })
    } catch (error) {
      console.error(error)
    }
  }
}
