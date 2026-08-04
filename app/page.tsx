import { getTasks } from "./actions";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default async function Home() {
  const tasks = await getTasks(true);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="border-b border-zinc-800 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Task Dashboard
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Local-first task management system
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400">
            {tasks.filter((t) => !t.isArchived).length} Active Tasks
          </div>
        </header>

        {/* Task Creation Form full-width at the top */}
        <TaskForm />

        {/* Task List Section directly below */}
        <TaskList initialTasks={tasks} />
      </div>
    </main>
  );
}