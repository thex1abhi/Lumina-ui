import axios from "axios"

export const askAI = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Message array is empty");
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model:"deepseek/deepseek-chat",
            messages:messages,
            temperature:0.7,
            max_tokens:2000,
            response_format:{type:"json_object"}
        })

    } catch (error) {

    }

}