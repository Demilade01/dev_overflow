import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({
        error: "Question is required.",
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Correct Authorization
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Replace with "gpt-4" if needed
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable assistant that provides quality information.",
          },
          {
            role: "user",
            content: `Tell me ${question}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API Error:", error);
      return NextResponse.json({ error: error.message || "API error" });
    }

    const responseData = await response.json();
    const reply = responseData.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ error: "No reply received from AI." });
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error processing AI request:", error.message);
    return NextResponse.json({ error: error.message });
  }
};
