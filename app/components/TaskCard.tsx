"use client";

import { useState } from "react";
import { updateTaskStatus, toggleArchiveTask, updateTask, TaskStatus } from "../actions";

interface Task {
  id: string;
  title: string;
  description: string | null;
  topic: string | null;
  dueDate: Date | null;
  status: string;
  isArchived: boolean;
}

function formatDate(dateInput: Date | string) {
  const d = new Date(dateInput);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function TaskCard({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "COMPLETE";

  const dueDateFormatted = task.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]
    : "";

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await updateTaskStatus(task.id, e.target.value as TaskStatus);
  }

  async function handleArchiveToggle() {
    await toggleArchiveTask(task.id, !task.isArchived);
  }

  async function handleEditSubmit(formData: FormData) {
    await updateTask(task.id, formData);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <form
        action={handleEditSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-4"
      >
        <h3 className="text-lg font-bold text-zinc-100">Edit Task</h3>
        <input
          type="text"
          name="title"
          defaultValue={task.title}
          required
          className="w-full px-3.5 py-2 border border-zinc-800 rounded-lg bg-zinc-950 text-zinc-100 text-sm"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="topic"
            defaultValue={task.topic || ""}
            placeholder="Topic"
            className="w-full px-3.5 py-2 border border-zinc-800 rounded-lg bg-zinc-950 text-zinc-100 text-sm"
          />
          <input
            type="date"
            name="dueDate"
            defaultValue={dueDateFormatted}
            className="w-full px-3.5 py-2 border border-zinc-800 rounded-lg bg-zinc-950 text-zinc-100 text-sm dark:[color-scheme:dark]"
          />
        </div>
        <textarea
          name="description"
          defaultValue={task.description || ""}
          rows={2}
          placeholder="Description"
          className="w-full px-3.5 py-2 border border-zinc-800 rounded-lg bg-zinc-950 text-zinc-100 text-sm resize-none"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-1.5 text-xs text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      className={`border rounded-xl p-5 shadow-md bg-zinc-900 transition-all ${
        isOverdue
          ? "border-red-500/80 bg-red-950/20"
          : "border-zinc-800 hover:border-zinc-700"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-zinc-100 text-lg tracking-wide">
            {task.title}
          </h3>
          {task.topic && (
            <span className="inline-block mt-1 text-xs font-medium bg-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-md border border-zinc-700/50">
              {task.topic}
            </span>
          )}
        </div>

        {isOverdue && (
          <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-800/80 px-2.5 py-1 rounded-md">
            ⚠️ OVERDUE
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-zinc-800/80 text-xs">
        <div>
          {task.dueDate ? (
            <span className="text-zinc-400 font-medium">
              Due: {formatDate(task.dueDate)}
            </span>
          ) : (
            <span className="text-zinc-500 italic">No due date</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-zinc-200 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETE">Complete</option>
          </select>

          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700/50 transition"
          >
            Edit
          </button>

          <button
            onClick={handleArchiveToggle}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              task.isArchived
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-amber-600 hover:bg-amber-500 text-white"
            }`}
          >
            {task.isArchived ? "Unarchive" : "Archive"}
          </button>
        </div>
      </div>
    </div>
  );
}