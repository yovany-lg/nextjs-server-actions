'use server';

import prisma from '@/lib/db';
import { Task } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createTask(formData: FormData) {
  await prisma.task.create({
    data: {
      title: formData.get('title') as string,
    },
  });
  revalidatePath('/tasks');
}

export async function toggleTask(taskId: Task['id'], done: boolean) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      done,
    },
  });
  revalidatePath('/tasks');
}
