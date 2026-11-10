"use client";

import { createTask } from "@/app/task/actions";

const CreateTask = () => {
  return (
    <form action={createTask}>
      <input type="text" name="title" placeholder="Enter task title" />

      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
