import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt } from "@/lib/prompt";
import { CONFIG, HTTP_STATUS } from "@/lib/constants";
import { GenerateRequest, GenerateResponse, APIError } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse | APIError>> {
  try {
    // Parse request body
    const body: unknown = await req.json();
    const { companyName, city, language = 'en' } = body as GenerateRequest;

    // Validate inputs
    if (!companyName?.trim() || !city?.trim()) {
      return NextResponse.json(
        {
          error: "Company name and city are required",
          success: false,
        } as APIError,
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    if (companyName.length > CONFIG.MAX_INPUT_LENGTH || city.length > CONFIG.MAX_INPUT_LENGTH) {
      return NextResponse.json(
        {
          error: `Input fields must not exceed ${CONFIG.MAX_INPUT_LENGTH} characters`,
          success: false,
        } as APIError,
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // Validate language
    if (!['da', 'en'].includes(language)) {
      return NextResponse.json(
        {
          error: "Language must be 'da' or 'en'",
          success: false,
        } as APIError,
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const prompt = buildPrompt(companyName.trim(), city.trim(), language);

    const response = await openai.chat.completions.create({
      model: CONFIG.MODEL,
      messages: [
        {
          role: "system",
          content: language === 'da'
            ? "Du er en erfaren SEO-strateg og AI-konsulent specialiseret i danske små virksomheder."
            : "You are a senior SEO strategist and AI consultant specializing in Danish small businesses."
        },
        { role: "user", content: prompt }
      ],
      temperature: CONFIG.TEMPERATURE,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          error: "No content generated",
          success: false,
        } as APIError,
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json(
      {
        content,
        success: true,
      } as GenerateResponse,
      { status: HTTP_STATUS.OK }
    );

  } catch (error) {
    console.error("Generation error:", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        {
          error: "OpenAI API error",
          details: error.message,
          success: false,
        } as APIError,
        { status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        success: false,
      } as APIError,
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}