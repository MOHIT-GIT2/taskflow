"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;

  if (!title.trim()) {
    return;
  }

  await prisma.task.create({
    data: {
      title: title,
      userId: 1,
    },
  });

  revalidatePath("/task");
}

export async function updateTask(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;

  if (!title.trim() || !id) {
    return;
  }

  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });

  revalidatePath("/task");
}

export async function deleteTask(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    return;
  }

  await prisma.task.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/task");
}

export async function toggleTaskStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status");

  if (!id) return;

  await prisma.task.update({
    where: { id },
    data: {
      status: status === "PENDING" ? "COMPLETED" : "PENDING",
    },
  });

  revalidatePath("/task");
}
