import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createMessageSchema } from "@/lib/validation/message";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, content, chatId } = createMessageSchema.parse(body);

    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        role,
        content,
        chatId,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
