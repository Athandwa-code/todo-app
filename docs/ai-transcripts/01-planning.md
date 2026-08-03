# Transcript 01: Project Setup and Database Initialization

### User
Hi Gemini, I am required to build a todo app using Next.js and SQLite. My VS Code is open, no folder open, What do we install?

### Assistant
Before we run any installation commands, let's make sure you have Node.js installed on your Windows machine, because Next.js and SQLite rely on it to run locally.

#### Step 1: Check if Node.js is Installed
In VS Code, open the built-in terminal by pressing `Ctrl + ~` (or go to the top menu: **Terminal -> New Terminal**).
Type this command and press Enter:

```powershell
node -v
```

* If it returns a version number (e.g., `v18.x.x` or `v20.x.x`): You're good to go!
* If it gives an error like "command not found" or "not recognized": You need to install Node.js first. Download and run the LTS installer from nodejs.org.

#### Step 2: Navigate to Where You Want Your Project
In your open VS Code terminal, navigate to the folder where you like to keep your university assignments (for example, your Desktop or Documents folder):

```powershell
cd ~\Desktop
```
*(Or `cd ~\Documents`)*

#### Step 3: Create the Next.js Project
Run this single standard command to initialize your Next.js application:

```powershell
npx create-next-app@latest
```

It will ask you a series of setup questions in the terminal. Here are the exact choices to select:
* What is your project named? -> `todo-app` (or whatever you prefer)
* Would you like to use TypeScript? -> Yes
* Would you like to use ESLint? -> Yes
* Would you like to use Tailwind CSS? -> Yes
* Would you like to use `src/` directory? -> Yes
* Would you like to use App Router? (recommended) -> Yes
* Would you like to customize the default import alias (`@/*`)? -> No

#### Step 4: Open the Folder in VS Code
Once the installer finishes:
In the terminal, enter your new project folder:

```powershell
cd todo-app
```

Open it in VS Code:

```powershell
code . -r
```
*(This reloads your current VS Code window straight into your new project folder!)*

---

### User
It is done installing, anything else?

### Assistant
We need to install Prisma now so we can connect our app to SQLite and create the database.
Run this command in your VS Code terminal (`Ctrl + ~`):

```powershell
npm install prisma @prisma/client
```

Let me know once that finishes installing!

---

### User
Done. 

```powershell
PS C:\Users\didia\Downloads\todo-app> npm install prisma @prisma/client

added 123 packages, and audited 485 packages in 59s

160 packages are looking for funding
  run `npm fund` for details

3 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\Users\didia\Downloads\todo-app> 
```

### Assistant
That finished cleanly! The warning about funding and vulnerabilities is completely normal for npm packages and won't affect our project.
We need to initialize Prisma with SQLite now.
Run this command in your terminal:

```powershell
npx prisma init --datasource-provider sqlite
```

Let me know once you run that!

---

### User
Done

---

### Assistant
We need to define your Task model inside `prisma/schema.prisma` now.
Open the `prisma/schema.prisma` file in VS Code, delete whatever is inside, and replace it with this:

```prisma
datasource db {
  provider = "sqlite"
}

generator client {
  provider = "prisma-client-js"
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  COMPLETE
}

model Task {
  id          String     @id @default(uuid())
  title       String
  description String?
  dueDate     DateTime
  topic       String
  status      TaskStatus @default(TODO)
  isArchived  Boolean    @default(false)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

Save the file and run this command in your terminal:

```powershell
npx prisma db push
```

---

The preceding document was planned with the assistance of the following: GeminiWeb[Gemini 3.6 Flash]