// const  mailer= require("nodemailer")
// require("dotenv").config()
// const fs = require("fs");
// const path = require("path");


// const mailSend = async(to,subject,htmlContent) => {
//     // const htmlPath = path.join(__dirname,"../templates",htmlFile);
//     // let htmlContent = fs.readFileSync(htmlPath,"utf-8")
//     //  if(token){
//     //     htmlContent = htmlContent.replace(/\$\{token\}/g, token)
//     // }
//     const transportar = mailer.createTransport({
//         service:"gmail",
//         auth:{
//             user : process.env.MAIL_USER,
//             pass : process.env.MAIL_PASSWORD
//         }
//     })
//     const mailOption={
//         to:to,
//         subject:subject,
//         // mailtext:mailtext
//         html:htmlContent
//     }

//     const mailResponse= await transportar.sendMail(mailOption)
//     console.log(mailResponse)
//     return mailResponse;

// }

// module.exports= mailSend;

const mailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const mailSend = async (to, subject, templateName, replacements = {}) => {
    try {
        // ✅ Read HTML file
        const filePath = path.join(__dirname, "../templates", templateName);
        let htmlContent = fs.readFileSync(filePath, "utf-8");

        // ✅ Replace dynamic values
        Object.keys(replacements).forEach((key) => {
            const value = replacements[key];
            htmlContent = htmlContent.replace(
                new RegExp(`{{${key}}}`, "g"),
                value
            );
        });

        // ✅ Transport
        const transporter = mailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOption = {
            from: process.env.MAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent, // ✅ HTML file used
        };

        const response = await transporter.sendMail(mailOption);
        console.log("Mail sent:", response);

        return response;

    } catch (error) {
        console.log("Mail error:", error);
    }
};

module.exports = mailSend;