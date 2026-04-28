import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(400).json({ message: "User does not has access token" })
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(400).json({ message: "Invalid Token" })
        }
        req.userId = verifyToken.userId
        next()
    } catch (error) {
        return res.status(400).json({ message: `Is auth error ${error} ` })
    }
}

export default isAuth