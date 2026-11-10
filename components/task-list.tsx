"use client";
import type { Prisma } from "../generated/prisma/client";
import { Fragment, useState } from "react";
import { updateTask, deleteTask, toggleTaskStatus } from "@/app/task/actions";

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
    <div>
      {tasks.map((item) => (
        <Fragment key={item.id}>
          <p>{item.title}</p>

          <button onClick={() => setEditingId(item.id)}>Edit</button>

          {editingId === item.id && (
            <form action={updateTask} onSubmit={() => setEditingId(null)}>
              <input type="hidden" name="id" value={item.id} />
              <input name="title" defaultValue={item.title} required />
              <button type="submit">Save</button>
            </form>
          )}

          <form action={deleteTask}>
            <input type="hidden" name="id" value={item.id} />
            <button type="submit">Delete</button>
          </form>
          <form action={toggleTaskStatus}>
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="status" value={item.status} />

            <button type="submit">
              {item.status === "PENDING"
                ? "Mark as Completed"
                : "Mark as Pending"}
            </button>
          </form>
          <p>{item.user.name}</p>
        </Fragment>
      ))}
    </div>
  );
};

export default TaskList;
