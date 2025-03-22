import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Container } from "@mui/material";
import CreateTask from "./CreateTask";
import TaskColumn from "./TaskColumns";

const TaskBoard = () => {
  const { tasks, moveTask } = useTaskContext();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    moveTask(draggableId, destination.droppableId as Task["status"]);
  };

  const columns: { [key in Task["status"]]: string } = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <Container className="flex flex-col">
      <CreateTask />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([status, title]) => (
            <TaskColumn
              key={status}
              status={status as Task["status"]}
              title={title}
              tasks={tasks}
            />
          ))}
        </div>
      </DragDropContext>
    </Container>
  );
};

export default TaskBoard;
