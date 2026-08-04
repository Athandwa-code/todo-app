"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETE";

export async function getTasks(includeArchived: boolean = false) {
  try {
    return await prisma.task.findMany({
      where: includeArchived ? {} : { isArchived: false },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw new Error("Could not retrieve tasks.");
  }
}

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const topic = formData.get("topic") as string | null;
  const dueDateStr = formData.get("dueDate") as string | null;

  if (!title || title.trim() === "") {
    throw new Error("Task title is required.");
  }

  try {
    await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || undefined,
        topic: topic?.trim() || undefined,
        dueDate: dueDateStr ? new Date(dueDateStr) : undefined,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create task:", error);
    throw new Error("Could not create task.");
  }
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
  try {
    await prisma.task.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update task status:", error);
    throw new Error("Could not update task status.");
  }
}

export async function updateTask(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const topic = formData.get("topic") as string | null;
  const dueDateStr = formData.get("dueDate") as string | null;

  if (!title || title.trim() === "") {
    throw new Error("Task title is required.");
  }

  try {
    await prisma.task.update({
      where: { id },
      data: {
        title: title.trim(),
        description: description?.trim() || undefined,
        topic: topic?.trim() || undefined,
        dueDate: dueDateStr ? new Date(dueDateStr) : null,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update task:", error);
    throw new Error("Could not update task.");
  }
}

export async function toggleArchiveTask(id: string, isArchived: boolean) {
  try {
    await prisma.task.update({
      where: { id },
      data: { isArchived },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to toggle archive task:", error);
    throw new Error("Could not update archive status.");
  }
}