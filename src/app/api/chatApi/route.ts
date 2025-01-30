import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  createChatSchema,
  updateChatSchema,
  deleteChatSchema,
} from "@/lib/validation/chat";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chats = await prisma.chat.findMany({
      where: { userId },
      include: { messages: true },
    });

    return NextResponse.json(chats, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title } = createChatSchema.parse(body);

    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newChat = await prisma.chat.create({
      data: {
        title,
        userId,
      },
    });

    return NextResponse.json(newChat, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title } = updateChatSchema.parse(body);

    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedChat = await prisma.chat.update({
      where: { id },
      data: { title },
    });

    return NextResponse.json(updatedChat, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = deleteChatSchema.parse(body);

    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.$transaction([
      prisma.message.deleteMany({
        where: { chatId: id },
      }),
      prisma.chat.delete({
        where: { id },
      }),
    ]);

    // await prisma.chat.delete({
    //   where: { id },
    // });

    return NextResponse.json(
      { message: "Chat deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
