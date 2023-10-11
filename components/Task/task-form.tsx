import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { createTask } from '@/app/tasks/actions';

export default function TaskForm() {
  return (
    <form action={createTask}>
      <div className="flex flex-col gap-y-2 mb-4">
        <Label htmlFor="name" className="text-lg">
          New Task
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          defaultValue=""
          placeholder="Buy groceries..."
        />
        <Button type="submit" className="w-full">
          Add
        </Button>
      </div>
    </form>
  );
}
