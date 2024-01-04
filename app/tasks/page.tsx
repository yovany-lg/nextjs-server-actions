import TaskComponent from '@/components/Task/task';
import TaskForm from '@/components/Task/task-form';
import { getTasks } from '@/lib/tasks';

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="max-w-xs w-full">
      <TaskForm />
      <ul className="flex flex-col gap-2 w-full">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskComponent task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}
