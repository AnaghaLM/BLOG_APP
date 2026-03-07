const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddleware");
    
    try {

        const authHeader  = req.headers.authorization
        
        if (!authHeader ) {
            return res.status(401).json("Token missing")
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.jwt_password)
        
        req.user = decoded
        next()

    } catch (err) {

        res.status(401).json("Invalid token")
    }

}

module.exports = jwtMiddleware