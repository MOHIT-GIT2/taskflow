import { Suspense } from "react";

type Props = {
  params: Promise<{
    taskId: string;
  }>;
};

const TaskDetails = async ({ params }: Props) => {
  const { taskId } = await params;

  return <h1>Task ID: {taskId}</h1>;
};

const TaskPage = ({ params }: Props) => {
  return (
    <Suspense fallback={<p>Loading data...</p>}>
      <TaskDetails params={params} />
    </Suspense>
  );
};

export default TaskPage;
