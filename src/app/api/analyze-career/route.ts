// src/app/api/analyze-career/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { UserResponses } from '@/types/career';
import { buildCareerAnalysisPrompt } from '@/lib/prompts';

export async function POST(req: NextRequest) {
  try {
    const responses: UserResponses = await req.json();
    
    console.log('Received user responses:', responses);

    // Debug: Check API key (remove after fixing)
    const apiKey = process.env.OPENROUTER_API_KEY;
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length || 0);
    console.log('API Key starts with sk-or:', apiKey?.startsWith('sk-or-') || false);

    // Check if API key exists
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'API key not configured. Please add OPENROUTER_API_KEY to your .env.local file' },
        { status: 500 }
      );
    }

    // Build the prompt
    const prompt = buildCareerAnalysisPrompt(responses);
    console.log('Prompt built successfully');

    // Call OpenRouter API
    console.log('Calling OpenRouter API...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Career Path Finder',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // You can also try: 'openai/gpt-4-turbo', 'google/gemini-pro'
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('OpenRouter API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });

      // Handle specific error cases
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your OPENROUTER_API_KEY in .env.local' },
          { status: 401 }
        );
      }

      if (response.status === 402) {
        return NextResponse.json(
          { error: 'Insufficient credits. Please add credits to your OpenRouter account at https://openrouter.ai/credits' },
          { status: 402 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please wait a moment and try again.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: `OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('OpenRouter API response received');

    // Check if response has content
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure from OpenRouter:', data);
      return NextResponse.json(
        { error: 'Invalid response from AI. Please try again.' },
        { status: 500 }
      );
    }

    const aiResponse = data.choices[0].message.content;
    console.log('AI Response length:', aiResponse.length);

    // Parse the JSON response from AI
    let careerRecommendation;
    try {
      // Try to extract JSON if there's any text around it
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        careerRecommendation = JSON.parse(jsonMatch[0]);
      } else {
        careerRecommendation = JSON.parse(aiResponse);
      }
      
      console.log('Successfully parsed career recommendation');
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('AI Response:', aiResponse.substring(0, 500)); // Log first 500 chars
      
      return NextResponse.json(
        { 
          error: 'Failed to parse career recommendations. The AI response was not in the expected format.',
          details: 'Please try again or contact support if the issue persists.'
        },
        { status: 500 }
      );
    }

    // Validate the response has required fields
    if (!careerRecommendation.primaryCareers || !careerRecommendation.explanation) {
      console.error('Response missing required fields:', careerRecommendation);
      return NextResponse.json(
        { error: 'Incomplete career recommendations received. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Sending successful response');
    return NextResponse.json(careerRecommendation);

  } catch (error: any) {
    console.error('Unexpected error in API route:', error);
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while generating recommendations',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS if needed
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}