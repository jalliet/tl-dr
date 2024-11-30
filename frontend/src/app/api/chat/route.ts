import { NextResponse } from 'next/server'
import type { ChatRequest, ChatResponse, MessageSection } from '@/types/chat'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const chatRequest: ChatRequest = {
      message: body.message,
      conversationHistory: body.conversationHistory || []
    }

    const API_URL = 'http://localhost:8000'
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatRequest),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch response from backend: ${response.status}`)
    }

    const data = await response.json()
    
    if (!Array.isArray(data.response)) {
      throw new Error('Backend response is not in the expected format')
    }

    const validatedResponse: MessageSection[] = data.response.map((section: any) => {
      if (!section.type || !section.content) {
        throw new Error('Invalid message section format')
      }
      return {
        type: section.type,
        content: section.content,
        ...(section.videoId && { videoId: section.videoId }),
        ...(section.startTime && { startTime: section.startTime })
      }
    })

    const chatResponse: ChatResponse = {
      response: validatedResponse
    }
    
    return NextResponse.json(chatResponse)
  } catch (error) {
    console.error('Error in chat API route:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 