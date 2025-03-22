import { Draggable } from "react-beautiful-dnd";
import { Card, CardContent, Typography } from "@mui/material";
import { Task } from "../types/types";

interface TaskItemProps {
  task: Task;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 shadow hover:shadow-lg transition-shadow"
        >
          <Card>
            <CardContent>
              <Typography variant="subtitle1" className="font-bold">
                {task.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {task.description}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
