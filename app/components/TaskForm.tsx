"use client";

import { useRef } from "react";
import { createTask } from "../actions";

export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    await createTask(formData);
    formRef.current?.reset();
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-5 bg-blue-500 rounded-full" />
        <h2 className="text-lg font-bold text-zinc-100">Add New Task</h2>
      </div>

      <form ref={formRef} action={clientAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Submit SDP Assignment"
              className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Topic
            </label>
            <input
              type="text"
              name="topic"
              placeholder="e.g., CS, Fun, Personal"
              className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:[color-scheme:dark]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={2}
            placeholder="Details..."
            className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg shadow-md active:scale-95 transition"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}