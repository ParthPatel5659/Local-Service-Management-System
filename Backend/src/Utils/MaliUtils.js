const  mailer= require("nodemailer")
require("dotenv").config()


const mailSend = async(to,subject,htmlContent) => {
    const transportar = mailer.createTransport({
        service:"gmail",
        auth:{
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASSWORD
        }
    })
    const mailOption={
        to:to,
        subject:subject,
        // mailtext:mailtext
        html:htmlContent
    }

    const mailResponse= await transportar.sendMail(mailOption)
    console.log(mailResponse)
    return mailResponse;

}

module.exports= mailSend;