const express = require('express')
const mail = require('./malier')
const multer = require('multer')
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

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + " " + Date.now() + " " + file.originalname)
    }
})

var upload = multer({
    storage: Storage
});


app.post('/mail', upload.single('image'), async (req, res) => {

    const sendmail = {
        mailReceiver: req.body.email,
        subject: req.body.subject,
        text: `Congratulation! ${req.body.name} You are successfully Registerd, Kindly ignore this mail because i am integrating this email service with my node js application`,
        path: req.file.path
    }

    await sentConfirmationMail(sendmail)


    res.status(200).json({
        success: true,
        mailDetails: sendmail
    })
})

app.listen(port, () => console.log(`Server is running at ${port}`))

