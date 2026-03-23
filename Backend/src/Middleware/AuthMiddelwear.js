const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {

    try {

        const token = req.headers.authorization;
        console.log(token);

        if (token) {

            if (token.startsWith("Bearer ")) {

                const tokenValue = token.split(" ")[1];

                // ✅ FIX ADDED HERE
                if (!tokenValue || tokenValue === "undefined") {
                    return res.status(401).json({
                        message: "jwt must be provided"
                    });
                }

                const decodedData = jwt.verify(tokenValue, jwtSecret);
                console.log("decoded user..", decodedData);

                req.user = decodedData;
                next();

            } else {
                return res.status(401).json({
                    message: "token is not Bearer token"
                });
            }

        } else {
            return res.status(401).json({
                message: "token is not present.."
            });
        }

    } catch (err) {
        console.log(err);

        // ✅ BETTER ERROR HANDLING
        return res.status(401).json({
            message: "Invalid or expired token",
            err: err.message
        });
    }
}

module.exports = validateToken;