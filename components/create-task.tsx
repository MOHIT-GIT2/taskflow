"use client";

import { createTask } from "@/app/tasks/actions";

const CreateTask = () => {
  return (
    <form
      action={createTask}
      className="flex items-center gap-2 w-full max-w-xl"
    >
      <input
        type="text"
        name="title"
        placeholder="What needs to be done?"
        className="flex-1 min-w-0 rounded-lg border border-[#167D8D]/40 bg-[#071B2B] px-4 py-2.5 text-sm text-[#EEEEEE] placeholder:text-gray-500 outline-none transition focus:border-[#167D8D]"
      />

      <button
        type="submit"
        className="rounded-lg bg-[#167D8D] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#126675]"
      >
        + Add Task
      </button>
    </form>
  );
};

export default CreateTask;
