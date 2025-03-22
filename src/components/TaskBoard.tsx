import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/types";
import { v4 as uuidv4 } from "uuid";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

const TaskBoard = () => {
  const { tasks, moveTask, addTask } = useTaskContext();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const taskId = draggableId;
    const newStatus = destination.droppableId as Task["status"];
    moveTask(taskId, newStatus);
  };

  const columns: { [key in Task["status"]]: string } = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };
  const handleAddTask = () => {
    addTask({
      title: "Title",
      description: "Descriptyopm",
      id: uuidv4(),
      status: "todo",
    });
  };

  return (
    <Container className="flex flex-col">
      <Box>
        <Button onClick={handleAddTask}>Create task </Button>
      </Box>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.entries(columns).map(([status, title]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 border rounded-lg bg-gray-50 shadow-md min-h-[200px]"
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
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2 shadow hover:shadow-lg transition-shadow"
                          >
                            <Card>
                              <CardContent>
                                <Typography
                                  variant="subtitle1"
                                  className="font-bold"
                                >
                                  {task.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {task.description}
                                </Typography>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </Container>
  );
};

export default TaskBoard;
