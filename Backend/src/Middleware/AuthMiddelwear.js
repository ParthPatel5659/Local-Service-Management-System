// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const jwtSecret = process.env.JWT_SECRET;

// const validateToken = async (req, res, next) => {

//     try {

//         const token = req.headers.authorization;
//         console.log(token);

//         if (token) {

//             if (token.startsWith("Bearer ")) {

//                 const tokenValue = token.split(" ")[1];

//                 // ✅ FIX ADDED HERE
//                 if (!tokenValue || tokenValue === "undefined") {
//                     return res.status(401).json({
//                         message: "jwt must be provided"
//                     });
//                 }

//                 const decodedData = jwt.verify(tokenValue, jwtSecret);
//                 console.log("decoded user..", decodedData);

//                 req.user = decodedData;
//                 next();

//             } else {
//                 return res.status(401).json({
//                     message: "token is not Bearer token"
//                 });
//             }

//         } else {
//             return res.status(401).json({
//                 message: "token is not present.."
//             });
//         }

//     } catch (err) {
//         console.log(err);

//         // ✅ BETTER ERROR HANDLING
//         return res.status(401).json({
//             message: "Invalid or expired token",
//             err: err.message
//         });
//     }
// }

// module.exports = validateToken;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        // ❌ No token
        if (!token) {
            return res.status(401).json({
                message: "Token is not present"
            });
        }

        // ❌ Wrong format
        if (!token.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token must be Bearer format"
            });
        }

        const tokenValue = token.split(" ")[1];

        // ❌ Empty token
        if (!tokenValue || tokenValue === "undefined") {
            return res.status(401).json({
                message: "JWT must be provided"
            });
        }

        // ✅ Verify token
        const decodedData = jwt.verify(tokenValue, jwtSecret);

        // ✅ IMPORTANT: store user info
        req.user = decodedData; 
        // Example decodedData:
        // { id: "providerId", role: "provider", email: "abc@gmail.com" }

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: err.message
        });
    }
};

module.exports = validateToken;