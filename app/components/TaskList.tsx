"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string | null;
  topic: string | null;
  dueDate: Date | null;
  status: string;
  isArchived: boolean;
}

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("CREATED");
  const [viewMode, setViewMode] = useState<"ACTIVE" | "ARCHIVED">("ACTIVE");

  const topics = Array.from(
    new Set(initialTasks.map((t) => t.topic).filter(Boolean))
  ) as string[];

  // Filter tasks by active/archived tab
  let filtered = initialTasks.filter((t) =>
    viewMode === "ACTIVE" ? !t.isArchived : t.isArchived
  );

  // Filter by topic
  if (selectedTopic !== "ALL") {
    filtered = filtered.filter((t) => t.topic === selectedTopic);
  }

  // Filter by status
  if (selectedStatus !== "ALL") {
    filtered = filtered.filter((t) => t.status === selectedStatus);
  }

  // Sorting logic
  filtered.sort((a, b) => {
    if (sortBy === "DUE_DATE") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === "TOPIC") {
      return (a.topic || "").localeCompare(b.topic || "");
    }
    if (sortBy === "STATUS") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
        {/* View Tabs */}
        <div className="flex gap-1 bg-zinc-200 dark:bg-zinc-800 p-1 rounded-md text-xs font-semibold">
          <button
            onClick={() => setViewMode("ACTIVE")}
            className={`px-3 py-1 rounded ${
              viewMode === "ACTIVE"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Active Tasks
          </button>
          <button
            onClick={() => setViewMode("ARCHIVED")}
            className={`px-3 py-1 rounded ${
              viewMode === "ARCHIVED"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Archived Tasks
          </button>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 text-zinc-800 dark:text-zinc-200"
          >
            <option value="ALL">All Topics</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 text-zinc-800 dark:text-zinc-200"
          >
            <option value="ALL">All Statuses</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETE">Complete</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 text-zinc-800 dark:text-zinc-200 font-medium"
          >
            <option value="CREATED">Sort: Default</option>
            <option value="DUE_DATE">Sort: Due Date</option>
            <option value="TOPIC">Sort: Topic</option>
            <option value="STATUS">Sort: Status</option>
          </select>
        </div>
      </div>

      {/* Task List Rendering */}
      {filtered.length === 0 ? (
        <p className="text-center py-8 text-zinc-500 text-sm">
          No {viewMode.toLowerCase()} tasks found.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}