import { z } from "zod";

export const createMessageSchema = z.object({
  role: z.enum(["user", "ai"]),
  content: z.string().min(1, "Content is required"),
  chatId: z.string().min(1, "Chat ID is required"),
});
