import { z } from "zod";

export const createChatSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const updateChatSchema = z.object({
  id: z.string().min(1, "Chat ID is required"),
  title: z.string().min(1, "Title is required"),
});

export const deleteChatSchema = z.object({
  id: z.string().min(1, "Chat ID is required"),
});
