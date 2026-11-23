import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
});

export const updateTaskSchema = z.object({
  id: z.coerce.number().int().positive("Invalid task ID"),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
});
