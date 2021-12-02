var nodemailer = require('nodemailer')
const path=require('path')

const sentConfirmationMail = async(sendmail) => {
    var transport = await nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'md.eesha418@gmail.com',
                pass: 'Eesha&0045'
            }
        }
    )

    //send out mail
    var mailOption = {
        from: 'md.eesha418@gmail.com',
        to: sendmail.mailReceiver,
        subject: sendmail.subject,
        text: sendmail.text,
        attachments: [
            {
                path: sendmail.path
            }
            
        ]
    }

  await transport.sendMail(mailOption, function (error, info) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Email Sent" + info.response)
        }
    })
}


module.exports = sentConfirmationMail;