export type Role = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  role: Role
  content: string
}

export interface MessageSection {
  type: 'text' | 'video'
  content: string
  videoId?: string
  startTime?: number
}

export interface ChatRequest {
  message: string
  conversationHistory: ChatMessage[]
}

export interface ChatResponse {
  response: MessageSection[]
} 