import MainWrapper from "@/components/MainWrapper";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ragChat } from "@/lib/rag-chat";

const Page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const chat = await prisma.chat.findUnique({
    where: { id: chatId, userId },
    include: { messages: true },
  });

  if (!chat) {
    return redirect("/chat");
  }

  const allChats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const sessionId = `${userId}--${chatId}`;
  const initialMessages = await ragChat.history.getMessages({
    amount: 10000,
    sessionId,
  });

  return (
    <div className="h-screen">
      <MainWrapper
        chat={chat}
        initialMessages={initialMessages}
        initialChats={allChats}
      />
    </div>
  );
};

export default Page;
