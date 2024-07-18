const jwt = require("jsonwebtoken")
const config = require("config")

// exports.verifyAuthenticationCustomer = (req, res, next) => {
//     const { tokenCustomer } = req.cookies;
//     if (tokenCustomer) {
//         jwt.verify(
//             tokenCustomer,
//             config.get("app.jwtAccessKey"),
//                 (error, customer) => {
//                     if (error) {
//                         return res.status(401).json("Authentication fails")
//                     }
//                     next();
//                 }
//             )
//     } else {
//         return res.status(403).json("Authentication required")
//     }
// }

exports.verifyAuthenticationCustomer = (req, res, next) => {
    const { token } = req.headers;
    if (token) {
        const verifyToken = token.split(" ")[1];
        jwt.verify(
            verifyToken,
            config.get("app.jwtAccessKey"),
            (error, customer) => {
                if (error) {
                    if(error.name === "TokenExpiredError") {
                        return res.status(200).json({
                            code : 401,
                            message : "Token Expired"
                        })
                    }
                    return res.status(401).json("Authentication fails")
                }
                next();
            }
        )
    } else {
        return res.status(403).json("Authentication required")
    }
}