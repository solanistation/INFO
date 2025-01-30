import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const summarize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const POST = async (req: NextRequest) => {
  try {
    const { messages, chatId } = await req.json();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!chatId) {
      const lastMessage = messages[messages.length - 1];
      console.log("lastMessage", lastMessage);
      const newChat = await prisma.chat.create({
        data: {
          title: summarize(lastMessage),
          userId,
        },
      });
      await prisma.message.create({
        data: {
          role: "user",
          content: lastMessage,
          chatId: newChat.id,
        },
      });
      const response = await ragChat.chat(lastMessage, {
        sessionId: userId + "--" + newChat.id,
      });
      console.log("response", response);
      await prisma.message.create({
        data: {
          role: "assistant",
          content: response.output,
          chatId: newChat.id,
        },
      });
      const redirectUrl = `/chat/${newChat.id}`;
      return NextResponse.json({ redirectUrl }, { status: 200 });
    } else {
      const lastMessage = messages[messages.length - 1].content;
      console.log("lastMessage", lastMessage);
      await prisma.message.create({
        data: {
          role: "user",
          content: lastMessage,
          chatId,
        },
      });
      const streamResponse = await ragChat.chat(lastMessage, {
        streaming: true,
        sessionId: userId + "--" + chatId,
      });

      if (streamResponse.output && streamResponse.output.tee) {
        const [streamForDb, streamForClient] = streamResponse.output.tee();

        (async () => {
          const reader = streamForDb.getReader();
          let completeMessage = "";
          let result;
          while (!(result = await reader.read()).done) {
            completeMessage += result.value;
          }
          await prisma.message.create({
            data: {
              role: "assistant",
              content: completeMessage,
              chatId,
            },
          });
        })();

        return aiUseChatAdapter({
          output: streamForClient,
          isStream: true,
        });
      } else {
        throw new Error("Stream is not tee-able");
      }
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
