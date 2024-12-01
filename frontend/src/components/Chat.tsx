import { useState } from 'react'
import { useRef } from 'react'
import { ChatInput } from './ChatInput'
import { Overview } from './Overview'
import { AnimatePresence } from 'framer-motion'
import { Message, ThinkingMessage } from './Message'
import { SearchInput } from './SearchInput'
import { YouTubeEmbed } from './YouTubeEmbed'
import { speechToText } from '@/app/api/speech/route'

interface MessageContent {
  type: 'text' | 'video';
  content: string;
  videoId?: string;
  startTime?: number;
}

interface Message {
  id: string;
  content: MessageContent[];
  sender: 'user' | 'system';
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: [{ type: 'text', content: input }],
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      const data = await response.json()
      
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: Array.isArray(data.response) ? data.response : [{ type: 'text', content: data.response }],
        sender: 'system'
      }

      setMessages(prev => [...prev, systemMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStop = () => {
    setIsLoading(false)
    // Add any additional stop logic here
  }

  const initRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.onstart = () => {
        audioChunks.current = []; // Resetting chunks array
      };
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        speechToText(audioBlob, setInput);
      };
    } catch (err) {
      console.error('Error creating recorder:', err);
    }
  }

  const startRecording = async () => {
    try {
      if (!mediaRecorderRef.current) {
        await initRecorder();
      }
  
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.start();
      }
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) {
      return;
    }
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  return (
    <div className="py-4 h-full flex flex-col">
      <div className="mb-4 flex-1 flex flex-col space-y-6">
        <AnimatePresence>
          {messages.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <Overview />
            </div>
          )}
        </AnimatePresence>
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            content={message.content}
            sender={message.sender}
          />
        ))}
        {isLoading && <ThinkingMessage />}
      </div>

      <div className="w-full mx-auto max-w-3xl px-4">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <SearchInput 
              key="search" 
              query={input} 
              setQuery={setInput} 
              onSubmit={handleSubmit}
              toggleRecording={toggleRecording}
              isRecording={isRecording}
            />
          ) : (
            <ChatInput
              key="chat"
              input={input}
              setInput={setInput}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onStop={handleStop}
              toggleRecording={toggleRecording}
              isRecording={isRecording}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 