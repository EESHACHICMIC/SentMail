const express = require('express')
const mail = require('./malier')
var nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
const sentConfirmationMail = require('./malier');

const port = 5000;
const app = express();
app.use(express.json())



app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is working.."
    })
})


app.post('/mail', async(req, res) => {

    const sendmail = {
        mailReceiver: req.body.email,
        subject: req.body.subject,
        text: `Congratulation! ${req.body.name} You are successfully Registerd, Kindly ignore this mail because i am integrating this email service with my node js application`
    }

    await sentConfirmationMail(sendmail)


    res.status(200).json({
        success: true,
        mailDetails: sendmail
    })
})

app.listen(port, () => console.log(`Server is running at ${port}`))

