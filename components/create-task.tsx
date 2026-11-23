"use client";

import { useActionState } from "react";
import { createTask, type CreateTaskState } from "@/app/tasks/actions";

const initialState: CreateTaskState = {};

const CreateTask = () => {
  const [state, formAction, isPending] = useActionState(
    createTask,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="flex items-center gap-2 w-full max-w-xl"
    >
      <div className="flex-1 min-w-0">
        <input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          className="w-full rounded-lg border border-[#167D8D]/40 bg-[#071B2B] px-4 py-2.5 text-sm text-[#EEEEEE] placeholder:text-gray-500 outline-none transition focus:border-[#167D8D]"
        />

        {state.error && (
          <p className="mt-1 text-sm text-red-400">{state.error}</p>
        )}

        {state.success && (
          <p className="mt-1 text-sm text-green-400">
            Task created successfully!
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-[#167D8D] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#126675] disabled:opacity-50"
      >
        {isPending ? "Adding..." : "+ Add Task"}
      </button>
    </form>
  );
};

export default CreateTask;
