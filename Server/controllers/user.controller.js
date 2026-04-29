import User from "../models/user.model.js"


export const getCurrentUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: "Failed to fetch current user" })

        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ message: ` controller  server  error ${error} ` })
    }
}

