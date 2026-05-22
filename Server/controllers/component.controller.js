import Component from "../models/component.model.js"
import User from "../models/user.model.js"

export const saveComponent = async (req, res) => {
    try {
        const { name, code, props } = req.body

        const user = await User.js.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        //check for admin role
        if (user.role === "admin") {
            const existing = await Component.findOne({ name, visibility: "public" })
            if (existing) {
                return res.status(400).json({
                    message: "Admin cannot create duplicate public component name"
                });
            }
        }
        // checking for user role
        if (user.role !== "admin") {
            const existing = await Component.findOne({
                name,
                owner: req.userId,
            })
            if (existing) {
                return res.status(400).json({
                    message: "You already have a component with this name"
                });
            }
        }
        const component = await Component.create({
            name,
            code,
            props,
            owner: req.userId,
        }) 
        return res.status(200).json(component)
    } catch (error) {
        return res.status(500).json({ message: `Failed to save component ${error}  ` })
    } 
} 


