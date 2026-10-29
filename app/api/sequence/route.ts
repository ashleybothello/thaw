import { NextResponse } from 'next/server';
import { retrieveRelevantStrategies } from '@/lib/rag';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taskDescription, energyLevel = 3 } = body;

    if (!taskDescription || typeof taskDescription !== 'string') {
      return NextResponse.json(
        { error: 'Task description is required' },
        { status: 400 }
      );
    }

    // 1. Retrieve relevant strategies using RAG
    const relevantStrategies = retrieveRelevantStrategies(taskDescription, energyLevel, 3);

    // Check if an AI provider API key is available (Anthropic or Gemini)
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    let aiResult = null;

    if (anthropicKey) {
      try {
        // Call Anthropic Claude API if key exists
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1500,
            system: `You are Thaw, a compassionate, non-judgmental AI co-pilot for neurodivergent students experiencing executive dysfunction or task paralysis. Your job is to break down daunting tasks into microscopic, low-friction steps. User energy level is ${energyLevel}/5. Use the provided RAG strategies to guide your response. Return valid JSON only with structure: { "acknowledgment": string, "firstStep": string, "steps": [{ "id": string, "title": string, "duration": string, "isEasiest": boolean }], "strategyUsed": string }`,
            messages: [
              {
                role: 'user',
                content: `Task: "${taskDescription}\n\nRetrieved Strategies:\n${JSON.stringify(relevantStrategies)}`
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.content[0].text;
          // Parse JSON from content
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            aiResult = JSON.parse(jsonMatch[0]);
          }
        }
      } catch (err) {
        console.error('Anthropic API error, falling back to local sequencer:', err);
      }
    }

    // Fallback or local deterministic sequencer if no AI key or API failed
    if (!aiResult) {
      const isLowEnergy = energyLevel <= 2;
      const stepsCount = isLowEnergy ? 3 : 5;
      
      const defaultSteps = [
        {
          id: 'step-1',
          title: `Open your workspace and set aside distractions for 2 minutes`,
          duration: '2 mins',
          isEasiest: true
        },
        {
          id: 'step-2',
          title: `Write down the core objective or title for: ${taskDescription.slice(0, 35)}...`,
          duration: '5 mins',
          isEasiest: false
        },
        {
          id: 'step-3',
          title: `Drafting initial rough notes or outline without filtering yourself`,
          duration: isLowEnergy ? '10 mins' : '15 mins',
          isEasiest: false
        }
      ];

      if (!isLowEnergy) {
        defaultSteps.push(
          {
            id: 'step-4',
            title: `Take a gentle 3-minute breather or stretch`,
            duration: '3 mins',
            isEasiest: true
          },
          {
            id: 'step-5',
            title: `Review and polish the first section`,
            duration: '10 mins',
            isEasiest: false
          }
        );
      }

      aiResult = {
        acknowledgment: isLowEnergy
          ? `It is completely valid to feel low on energy today. We are going to keep things extremely gentle and small.`
          : `That sounds like a meaningful task. Let's melt the overwhelm by turning it into manageable steps.`,
        firstStep: defaultSteps[0].title,
        steps: defaultSteps,
        strategyUsed: relevantStrategies[0]?.title || 'The Two-Minute Micro-Start'
      };
    }

    return NextResponse.json({
      success: true,
      data: aiResult,
      ragContext: relevantStrategies,
      isLiveAI: !!anthropicKey && !!aiResult
    });

  } catch (error: any) {
    console.error('Sequence API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
