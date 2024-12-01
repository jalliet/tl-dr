"use client";

import type { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useWindowSize } from "usehooks-ts";

import { ChatHeader } from "@/components/chat-header";
import { PreviewMessage, ThinkingMessage } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import type { Vote } from "@/lib/db/schema";
import { fetcher } from "@/lib/utils";

import { Block, type UIBlock } from "./block";
import { BlockStreamHandler } from "./block-stream-handler";
import { MultimodalInput } from "./multimodal-input";
import { Overview } from "./overview";
import { useSession } from "next-auth/react";

export function Chat({
  id,
  initialMessages,
  selectedModelId,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
}) {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    data: streamingData,
  } = useChat({
    body: { id, modelId: selectedModelId, userId: session?.user?.id },
    // api: `/api/chat`,
    api: `http://localhost:8000/api/chat`,
    initialMessages,
    onFinish: () => {
      mutate("/api/history");
    },
  });

  const { width: windowWidth = 1920, height: windowHeight = 1080 } =
    useWindowSize();

  const [block, setBlock] = useState<UIBlock>({
    documentId: "init",
    content: "",
    title: "",
    status: "idle",
    isVisible: false,
    boundingBox: {
      top: windowHeight / 4,
      left: windowWidth / 4,
      width: 250,
      height: 50,
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher
  );

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader selectedModelId={selectedModelId} />
        <div
          ref={messagesContainerRef}
          className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col flex-1 justify-center">
              <Overview />
              <div className="flex items-center justify-center px-4 -mt-12">
                <div className="w-full max-w-2xl">
                  <MultimodalInput
                    chatId={id}
                    input={input}
                    setInput={setInput}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    stop={stop}
                    attachments={attachments}
                    setAttachments={setAttachments}
                    messages={messages}
                    setMessages={setMessages}
                    append={append}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto px-4">
              {messages.map((message, index) => (
                <PreviewMessage
                  key={message.id}
                  chatId={id}
                  message={message}
                  block={block}
                  setBlock={setBlock}
                  isLoading={isLoading && messages.length - 1 === index}
                  vote={votes?.find((vote) => vote.messageId === message.id)}
                />
              ))}
              {/* <PreviewMessage
                key={0}
                chatId={"1"}
                message={{
                  id: "05d28140-bc3f-414a-9292-da6b89a03af6",
                  role: "assistant",
                  content:
                    "Hello, how can I help you today? \n\n[youtube](https://www.youtube.com/watch?v=dQw4w9WgXcQ)",
                }}
                block={block}
                setBlock={setBlock}
                isLoading={isLoading && messages.length - 1 === 0}
                vote={undefined}
              /> */}
            </div>
          )}

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <div className="w-full max-w-3xl mx-auto px-4">
                <ThinkingMessage />
              </div>
            )}

          {messages.length > 0 &&
            messages[messages.length - 1].role === "assistant" &&
            messages[messages.length - 1].content === "" && (
              <div className="w-full max-w-3xl mx-auto px-4">
                <ThinkingMessage />
              </div>
            )}

          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>

        {messages.length > 0 && (
          <div className="w-full bg-background pb-4 md:pb-6">
            <form className="flex mx-auto px-4 gap-2 w-full max-w-2xl">
              <MultimodalInput
                chatId={id}
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                stop={stop}
                attachments={attachments}
                setAttachments={setAttachments}
                messages={messages}
                setMessages={setMessages}
                append={append}
              />
            </form>
          </div>
        )}
      </div>

      <AnimatePresence>
        {block?.isVisible && (
          <Block
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            append={append}
            block={block}
            setBlock={setBlock}
            messages={messages}
            setMessages={setMessages}
            votes={votes}
          />
        )}
      </AnimatePresence>

      <BlockStreamHandler streamingData={streamingData} setBlock={setBlock} />
    </>
  );
}