import OpenAI from "openai";

export const configureOpenAI = () =>{
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_SECRETE_KEY
    })

    return openai;
}