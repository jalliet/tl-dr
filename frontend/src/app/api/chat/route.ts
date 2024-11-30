import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    // Temporary: Return a mock response with mixed content
    // Later, this should come from your actual API
    const mockResponse = {
      response: [
        { 
          type: 'text', 
          content: "Here's an explanation of how React components work:" 
        },
        { 
          type: 'youtube',
          content: 'Watch this excellent tutorial on React components:',
          videoId: 'Tn6-PIqc4UM',
          startTime: 89
        },
        { 
          type: 'text',
          content: 'As shown in the video above, components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.'
        }
      ]
    }

    return NextResponse.json(mockResponse)

    // Your original API call code - commented out for now
    /*
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://10.20.26.107:7860'
    
    const apiEndpoint = `${API_URL}/api/chat?__token=${process.env.HUGGING_FACE_HUB_TOKEN}`
    console.log('Attempting to fetch from:', apiEndpoint)

    const messages = [
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUGGING_FACE_HUB_TOKEN}`
      },
      body: JSON.stringify({
        user_id: 'default_user',
        messages: messages
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend response error:', errorText)
      throw new Error(`Failed to fetch response from backend: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
    */
  } catch (error) {
    console.error('Error in chat API route:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 