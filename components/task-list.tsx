type Task = {
  id: number;
  title: string;
};

type Props = {
  tasks: Task[];
};

const TaskList = ({ tasks }: Props) => {
  return (
    <div>
      {tasks.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default TaskList;
