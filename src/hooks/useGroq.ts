import { useState } from "react";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_KEY ,
    dangerouslyAllowBrowser: true,
});

export function useGroq() {
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGroqResponse = async (taskType: string, prompt: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: ` ${taskType} ${prompt}`,
                    },
                ],
                model: "llama-3.3-70b-versatile",
            });

            setResponse(chatCompletion.choices[0]?.message?.content || "No response");
        } catch (err: any) {
            setError(err?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { fetchGroqResponse, response, loading, error };
}
