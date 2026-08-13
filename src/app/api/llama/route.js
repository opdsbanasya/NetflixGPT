import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

export async function POST(request) {
    try {
        const { query } = await request.json();
        
        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        const groq = new Groq({
            apiKey: process.env.NEXT_PUBLIC_GROQ_API
        });

        const llamaResult = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: query,
                },
            ],
            model: "qwen/qwen3.6-27b",
            temperature: 1,
            max_tokens: 4096,
            top_p: 1,
            stop: null,
            stream: false,
        });

        if (!llamaResult) {
            throw new Error("No result from Groq");
        }
        
        const content = llamaResult.choices[0]?.message?.content;
        return NextResponse.json({ content });

    } catch (error) {
        console.error("Llama/Groq API Error:", error);
        return NextResponse.json({ error: 'Failed to fetch from Groq' }, { status: 500 });
    }
}
