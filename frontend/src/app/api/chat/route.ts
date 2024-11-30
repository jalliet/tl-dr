import { NextResponse } from 'next/server'
import type { ChatRequest, ChatResponse } from '@/types/chat'

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
    const chatResponse: ChatResponse = {
      response: data.response
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