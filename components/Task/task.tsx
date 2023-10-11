'use client';

import { Task } from '@prisma/client';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { toggleTask } from '@/app/tasks/actions';

export default function TaskComponent({ task }: { task: Task }) {
  const { done, id, title } = task;
  const taskId = `task-${id}`;

  return (
    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex gap-2 items-center w-full">
      <Checkbox
        id={taskId}
        checked={done}
        onClick={async () => {
          await toggleTask(id, !done);
        }}
      />
      <Label htmlFor={taskId}>{title}</Label>
    </div>
  );
}
