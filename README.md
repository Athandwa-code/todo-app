# Local-First Task Tracker

A single-user, local-first task management application built using Next.js, SQLite, and Prisma.

---

## 1. Third-Party Code

The following libraries and packages were installed to support application requirements:

* **Next.js (`v16.2.12`)**: Full-stack React framework chosen for Server Actions, App Router architecture, and seamless local SSR/client hydration.
* **React & React DOM (`v19.2.4`)**: UI rendering library chosen for component-driven UI state management.
* **@prisma/client & prisma (`v7.9.1`)**: Type-safe ORM chosen for clean SQLite schema management, migrations, and query execution.
* **@prisma/adapter-better-sqlite3 (`v7.9.1`) & better-sqlite3 (`v13.0.2`)**: Native SQLite driver adapter chosen to enable embedded local database access without external server dependencies.
* **Tailwind CSS (`v4.3.3`)**: Utility-first CSS framework chosen for accessible dark/light mode UI styling and responsive layouts.
* **Vitest (`v4.1.10`)**: Vite-native testing framework chosen for fast, deterministic integration test execution against isolated SQLite test databases.

---

## 2. Database Design

The application utilizes an embedded SQLite database managed via Prisma ORM (`prisma/schema.prisma`).

### Task Model Table Schema

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id @default(uuid())` | Unique Primary Key identifier. |
| `title` | `String` | Required | Short summary title of the task. |
| `description` | `String?` | Optional | Detailed context or notes for the task. |
| `topic` | `String?` | Optional | Categorization tag (e.g., CS, Personal, Work). |
| `dueDate` | `DateTime?` | Optional | Target completion date. |
| `status` | `String` | `@default("TODO")` | State of task: `"TODO"`, `"IN_PROGRESS"`, or `"COMPLETE"`. |
| `isArchived` | `Boolean` | `@default(false)` | Flag denoting soft-delete/archived visibility state. |
| `createdAt` | `DateTime` | `@default(now())` | Timestamp when record was initially created. |
| `updatedAt` | `DateTime` | `@updatedAt` | Timestamp when record was last updated. |

### Architectural Design Choices

* **Soft Delete via Archive Flag**: In accordance with the specification, tasks are never permanently deleted from the database. Archiving toggles `isArchived = true`, keeping records available for view/restoration under the archived view.
* **Dynamic Overdue Computation**: Overdue status is intentionally **not** stored as a column or status value. Instead, it is derived at read-time whenever `dueDate < currentTime` AND `status != 'COMPLETE'`.
* **Single Table Model**: Because the application serves a single local user with simple scalar topic labels, a single normalized `Task` entity satisfies all read/write, sorting, and filtering requirements cleanly.

---

## 3. Running It

### Prerequisites
* **Node.js**: `v24.13.1`
* **npm**: `v11.8.0`

### Step-by-Step Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Athandwa-code/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the local SQLite database:
   ```bash
   npx prisma db push
   ```

4. Run the development application:
   ```bash
   npm run dev
   ```

Open `http://localhost:3000` in your web browser.

Running Automated Tests
To execute the automated test suite against an isolated throwaway test database:
```bash
npm test
```

