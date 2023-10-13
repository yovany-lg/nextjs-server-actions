'use client';
import { experimental_useOptimistic as useOptimistic } from 'react';
import { Task } from '@prisma/client';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { toggleTask } from '@/app/tasks/actions';

export default function TaskComponent({ task }: { task: Task }) {
  const [optimisticTask, toggle] = useOptimistic<Task, boolean>(
    task,
    (prevState, done) => ({
      ...prevState,
      done,
    })
  );
  const { done, id, title } = optimisticTask;
  const taskId = `task-${id}`;

  return (
    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex gap-2 items-center w-full">
      <Checkbox
        id={taskId}
        checked={done}
        onClick={async () => {
          toggle(!done);
          await toggleTask(id, !done);
        }}
      />
      <Label htmlFor={taskId} className={done ? 'line-through' : ''}>
        {title}
      </Label>
    </div>
  );
}
