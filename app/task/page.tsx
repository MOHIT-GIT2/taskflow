import SearchBar from "@/components/searchbar";
import Link from "next/link";
import TaskList from "@/components/task-list";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import CreateTask from "@/components/create-task";

type Props = {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    search?: string;
    page?: string;
  }>;
};
const TaskPage = async ({ searchParams }: Props) => {
  const { status, priority, search, page } = await searchParams;
  const normalizedStatus =
    status === "pending"
      ? "PENDING"
      : status === "completed"
        ? "COMPLETED"
        : undefined;

  const currentPage = Math.max(0, Number(page) || 1);
  const pageSize = 10;

  const where: Prisma.TaskWhereInput = {
    ...(normalizedStatus ? { status: normalizedStatus } : {}),
    ...(search
      ? {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {}),
  };

  const skip = (currentPage - 1) * pageSize;
  const totalTasks = await prisma.task.count({
    where,
  });
  const totalPages = Math.max(1, Math.ceil(totalTasks / pageSize));

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (priority) params.set("priority", priority);
    if (search) params.set("search", search);

    params.set("page", String(pageNumber));

    return `/task?${params.toString()}`;
  };

  const tasks = await prisma.task.findMany({
    where,
    take: pageSize,
    skip: skip,
    include: {
      user: true,
    },
  });

  return (
    <div>
      <h1>Tasks Page</h1>
      <SearchBar />
      <CreateTask />
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>
      <p>Search: {search}</p>
      <Link href="/task">All</Link>
      <Link href="/task?status=pending">Pending</Link>
      <Link href="/task?status=completed">Completed</Link>
      <TaskList tasks={tasks} />
      <div>
        {currentPage > 1 && (
          <Link href={createPageUrl(currentPage - 1)}>Previous</Link>
        )}

        {currentPage < totalPages && (
          <Link href={createPageUrl(currentPage + 1)}>Next</Link>
        )}
      </div>

      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default TaskPage;
