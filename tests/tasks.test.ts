import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Initialize SQLite adapter for Prisma directly with URL object
const adapter = new PrismaBetterSqlite3({ url: "file:./test.db" });
const prisma = new PrismaClient({ adapter });

describe("Task Tracker Core Logic & DB Operations", () => {
beforeAll(() => {
    // Push the schema to the throwaway test database
    execSync("npx prisma db push", {
      env: { ...process.env, DATABASE_URL: "file:./test.db" },
    });
  });

  beforeEach(async () => {
    // Clear test table before each run
    await prisma.task.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // TEST 1: Task Creation with all 4 fields
  it("should create a task with all four fields (title, topic, due date, description)", async () => {
    const dueDate = new Date("2026-09-01");
    const task = await prisma.task.create({
      data: {
        title: "Complete Systems Assignment",
        topic: "Computer Science",
        dueDate: dueDate,
        description: "Must submit before midnight",
        status: "TODO",
      },
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe("Complete Systems Assignment");
    expect(task.topic).toBe("Computer Science");
    expect(task.dueDate).toEqual(dueDate);
    expect(task.status).toBe("TODO");
    expect(task.isArchived).toBe(false);
  });

  // TEST 2: Archiving dynamic behavior
  it("should mark a task as archived without deleting it from the database", async () => {
    const createdTask = await prisma.task.create({
      data: {
        title: "Archive Test Task",
        status: "TODO",
      },
    });

    const archivedTask = await prisma.task.update({
      where: { id: createdTask.id },
      data: { isArchived: true },
    });

    expect(archivedTask.isArchived).toBe(true);

    const dbTask = await prisma.task.findUnique({
      where: { id: createdTask.id },
    });
    expect(dbTask).not.toBeNull();
    expect(dbTask?.isArchived).toBe(true);
  });

  // TEST 3: Overdue Rule Evaluation Logic
  it("should correctly identify an overdue task dynamically when due date is in past and status is not COMPLETE", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const overdueTask = await prisma.task.create({
      data: {
        title: "Overdue Task",
        dueDate: yesterday,
        status: "IN_PROGRESS",
      },
    });

    const completedTask = await prisma.task.create({
      data: {
        title: "Completed Task",
        dueDate: yesterday,
        status: "COMPLETE",
      },
    });

    const isOverdue = (task: { dueDate: Date | null; status: string }) =>
      Boolean(task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "COMPLETE");

    expect(isOverdue(overdueTask)).toBe(true);
    expect(isOverdue(completedTask)).toBe(false);
  });
});