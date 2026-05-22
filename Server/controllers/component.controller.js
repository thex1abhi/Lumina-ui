import Component from "../models/component.model.js"
import User from "../models/user.model.js"

export const saveComponent = async (req, res) => {
    try {
        const { name, code, props } = req.body

        const user = await User.js.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (user.role === "admin") {
            const existing = await Component.findOne({ name, visibility: "public" })
        }

    } catch (error) {

    }

}