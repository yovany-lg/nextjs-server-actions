import prisma from './db';

export async function getTasks() {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
