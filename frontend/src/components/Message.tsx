'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { YouTubeEmbed } from './YouTubeEmbed';
import ReactMarkdown from 'react-markdown';

interface MessageContent {
  type: 'text' | 'video';
  content: string;
  videoId?: string;
  startTime?: number;
}

interface MessageProps {
  id: string;
  content: MessageContent[];
  sender: 'user' | 'system';
}

export function Message({ id, content, sender }: MessageProps) {
  const handleLike = () => {
    console.log('Liked message:', id);
  };

  const handleDislike = () => {
    console.log('Disliked message:', id);
  };

  const renderContent = (item: MessageContent, index: number) => {
    switch (item.type) {
      case 'video':
        return (
          <YouTubeEmbed
            key={`${id}-video-${index}`}
            videoId={item.videoId!}
            startTime={item.startTime}
          />
        );
      case 'text':
      default:
        return (
          <div key={`${id}-text-${index}`} className="max-w-none">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={sender === 'user' ? 'user' : 'assistant'}
    >
      <div
        className={cn(
          'flex gap-4 w-full',
          sender === 'user' 
            ? 'bg-primary text-primary-foreground px-3 w-fit ml-auto max-w-2xl py-2 rounded-lg' 
            : ''
        )}
      >
        {sender === 'system' && (
          <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-primary/5">
            <Sparkles className="size-4 text-primary" />
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4">
            {content.map((item, index) => renderContent(item, index))}
          </div>
          {sender === 'system' && (
            <div className="flex gap-2 items-center mt-2">
              <button
                onClick={handleLike}
                className="p-1 hover:bg-primary/10 rounded-md transition-colors"
                aria-label="Like message"
              >
                <ThumbsUp className="size-4" />
              </button>
              <button
                onClick={handleDislike}
                className="p-1 hover:bg-primary/10 rounded-md transition-colors"
                aria-label="Dislike message"
              >
                <ThumbsDown className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ThinkingMessage() {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role="assistant"
    >
      <div className="flex gap-4 w-full">
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-primary/5">
          <Sparkles className="size-4 text-primary" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
}