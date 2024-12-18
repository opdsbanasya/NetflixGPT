import Groq from "groq-sdk";

const groq = new Groq(
    {
        apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
        dangerouslyAllowBrowser: true
    },
);

export const llamaModel = async (query) => {

    llamaResult = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: query,
            },
        ],

        model: "llama3-8b-8192",

        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 1,

        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_tokens: 1024,

        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,

        // A stop sequence is a predefined or user-specified text string that
        // signals an AI to stop generating content, ensuring its responses
        // remain focused and concise. Examples include punctuation marks and
        // markers like "[end]".
        stop: null,

        // If set, partial message deltas will be sent.
        stream: false,
    });

    if(!llamaResult) return;
    const {content} = llamaResult?.choices[0]?.message;

    return content;
    
}

export default groq;