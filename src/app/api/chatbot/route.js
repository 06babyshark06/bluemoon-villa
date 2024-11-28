import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req, res) => {
  const { message } = await req.json();

  if (!message) {
    return new NextResponse(
      JSON.stringify({ error: "Message is required" }, { status: 400 })
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const chatbotReply = completion.choices[0].message;
    console.log(chatbotReply);
    return new NextResponse(JSON.stringify(chatbotReply), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
