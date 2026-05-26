import axios from "axios"

export const askAI = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Message array is empty");
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "deepseek/deepseek-chat",
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
            response_format: { type: "json_object" }
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "X-OpenRouter-Title": "LuminaUI",
                "Content-Type": "application/json",
            },
        }
        )
        const content = response?.data?.choices?.[0]?.message?.content
        if (!content || !content.trim()) {
            throw new Error("AI returned empty response")
        }
        return content
    } catch (error) {
        console.log("OpenRouter error:",error.response?.data || error.message);
        throw new Error("Open router API error") 
    }

}