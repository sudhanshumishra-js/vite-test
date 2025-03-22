export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
};

export type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: Task["status"]) => void;
};
