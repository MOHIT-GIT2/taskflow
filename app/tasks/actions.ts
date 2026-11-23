"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  taskSchema,
  updateTaskSchema,
} from "@/lib/validation/task";

export type CreateTaskState = {
  error?: string;
  success?: boolean;
};

export async function createTask(
  prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const result = taskSchema.safeParse({
    title: formData.get("title"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  await prisma.task.create({
    data: {
      title: result.data.title,
      userId: session.user.id,
    },
  });

  revalidatePath("/tasks");
  return { success: true };
}

export async function updateTask(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const result = updateTaskSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
  });

  if (!result.success) {
    return;
  }

  await prisma.task.updateMany({
    where: {
      id: result.data.id,
      userId: session.user.id,
    },
    data: {
      title: result.data.title,
    },
  });

  revalidatePath("/tasks");
}

export async function deleteTask(formData: FormData) {
  const id = Number(formData.get("id"));

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!id) {
    return;
  }

  await prisma.task.deleteMany({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  revalidatePath("/tasks");
}

export async function toggleTaskStatus(formData: FormData) {
  const id = Number(formData.get("id"));

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!id) return;

  const task = await prisma.task.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    select: {
      status: true,
    },
  });

  if (!task) return;

  await prisma.task.updateMany({
    where: {
      id,
      userId: session.user.id,
      status: task.status,
    },
    data: {
      status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
    },
  });

  revalidatePath("/tasks");
}
