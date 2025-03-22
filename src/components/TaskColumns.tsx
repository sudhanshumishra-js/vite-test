import { Droppable } from "react-beautiful-dnd";
import { Typography } from "@mui/material";
import { Task } from "../types/types";
import TaskItem from "./TaskItem";

interface TaskColumnProps {
  status: Task["status"];
  title: string;
  tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, title, tasks }) => {
  return (
    <Droppable droppableId={status} type="group">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="p-4 border border-gray-200 rounded-lg bg-[#FCFAF8] shadow-md min-h-[200px]"
        >
          <Typography
            variant="h6"
            align="center"
            className="mb-4 font-bold text-lg text-gray-700"
          >
            {title}
          </Typography>

          {tasks
            .filter((task) => task.status === status)
            .map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;
