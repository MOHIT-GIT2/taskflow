"use client";

import type { Prisma } from "../generated/prisma/client";
import { Fragment, useState } from "react";
import { updateTask, deleteTask, toggleTaskStatus } from "@/app/tasks/actions";
import Link from "next/link";
import MainPage from "./mainpage";

type TaskWithUser = Prisma.TaskGetPayload<{
  include: {
    user: true;
  };
}>;

type Props = {
  tasks: TaskWithUser[];
};

const TaskList = ({ tasks }: Props) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl divide-y divide-[#167D8D]/20">
      {tasks.map((item) => (
        <Fragment key={item.id}>
          <div className="flex items-center justify-between gap-3 py-4">
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm ${
                  item.status === "COMPLETED"
                    ? "text-gray-500 line-through"
                    : "text-[#EEEEEE]"
                }`}
              >
                {item.title}
              </p>

              <span className="mt-1 inline-block text-xs text-[#B9E4E8]/60">
                {item.status === "PENDING" ? "Pending" : "Completed"}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-3 text-xs">
              <button
                onClick={() =>
                  setEditingId(editingId === item.id ? null : item.id)
                }
                className="text-[#B9E4E8] hover:text-white"
              >
                Edit
              </button>

              <form action={toggleTaskStatus}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="status" value={item.status} />
                <button className="text-[#167D8D] hover:text-[#B9E4E8]">
                  {item.status === "PENDING" ? "Complete" : "Undo"}
                </button>
              </form>

              <form action={deleteTask}>
                <input type="hidden" name="id" value={item.id} />
                <button className="text-red-400/70 hover:text-red-400">
                  Delete
                </button>
              </form>
            </div>
          </div>

          {editingId === item.id && (
            <form
              action={updateTask}
              onSubmit={() => setEditingId(null)}
              className="flex gap-2 pb-4"
            >
              <input type="hidden" name="id" value={item.id} />
              <input
                name="title"
                defaultValue={item.title}
                required
                className="min-w-0 flex-1 rounded-md border border-[#167D8D]/40 bg-[#071B2B] px-3 py-2 text-sm text-[#EEEEEE] outline-none focus:border-[#167D8D]"
              />
              <button className="rounded-md bg-[#167D8D] px-3 py-2 text-xs text-white hover:bg-[#126675]">
                Save
              </button>
            </form>
          )}
        </Fragment>
      ))}
      <MainPage/>
    </div>
  );
};

export default TaskList;
