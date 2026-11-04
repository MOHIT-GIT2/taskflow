import SearchBar from "@/components/searchbar";
import Link from "next/link";
import TaskList from "@/components/task-list";

const tasks = [
  { id: 1, title: "Learn Next.js" },
  { id: 2, title: "Learn Prisma" },
  { id: 3, title: "Build TaskFlow" },
];

type Props = {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    search?: string;
  }>;
};

const TaskPage = async ({ searchParams }: Props) => {
  const { status, priority, search } = await searchParams;

  return (
    <div>
      <h1>Tasks Page</h1>
      <SearchBar />
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>
      <p>Search: {search}</p>
      <Link href="/task">All</Link>
      <Link href="/tasks?status=pending">Pending</Link>
      <Link href="/tasks?status=completed">Completed</Link>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskPage;
