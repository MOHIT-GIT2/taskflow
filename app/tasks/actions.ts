"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!title.trim()) {
    return;
  }

  await prisma.task.create({
    data: {
      title: title,
      userId: session.user.id,
    },
  });

  revalidatePath("/tasks");
}

export async function updateTask(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!title.trim() || !id) {
    return;
  }

  await prisma.task.updateMany({
    where: {
      id: id,
      userId: session.user.id,
    },
    data: {
      title: title,
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
