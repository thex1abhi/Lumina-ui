import axios from "axios"

export const askAI = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Message array is empty");
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            
        })

    } catch (error) {

    }

}