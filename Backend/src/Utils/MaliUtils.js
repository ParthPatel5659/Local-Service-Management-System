const mailer = require('nodemailer')
require("dotenv").config()
const fs = require('fs')
const path = require('path')

const mailSend = async(to,subject,htmlFile,token)=> {
    const htmlPath = path.join(__dirname,"../templets",htmlFile);
    let htmlContent = fs.readFileSync(htmlPath,"utf-8")
    if(token){
        htmlContent = htmlContent.replace(/\$\{token\}/g, token)
        htmlContent = htmlContent.replace(/\$\{url\}/g, token) // token acts as the full URL in this context
    }
    const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASSWORD
        }
    })
    const mailOptions = {
        to : to,
        subject : subject,
        html : htmlContent
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    console.log(mailResponse)
    return mailResponse
}

module.exports = mailSend