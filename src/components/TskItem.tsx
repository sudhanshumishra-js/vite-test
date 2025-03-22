import { useState, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/types";

interface TaskItemProps {
  task: Task;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const { moveTask, updateTask } = useTaskContext();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleMoveTask = (newStatus: Task["status"]) => {
    moveTask(task.id, newStatus);
  };

  const saveChanges = () => {
    if (editedTitle !== task.title || editedDescription !== task.description) {
      updateTask(task.id, {
        title: editedTitle,
        description: editedDescription,
      });
    }
    setIsEditingTitle(false);
    setIsEditingDescription(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "title" | "description"
  ) => {
    if (e.key === "Enter") saveChanges();
    if (e.key === "Escape") {
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      setIsEditingTitle(false);
      setIsEditingDescription(false);
    }
  };

  const renderButtons = () => {
    switch (task.status) {
      case "todo":
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleMoveTask("in-progress")}
            >
              Mark In Progress
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleMoveTask("completed")}
            >
              Mark Completed
            </Button>
          </>
        );

      case "in-progress":
        return (
          <>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleMoveTask("completed")}
            >
              Mark Completed
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => handleMoveTask("todo")}
            >
              Mark To Do
            </Button>
          </>
        );

      case "completed":
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleMoveTask("in-progress")}
            >
              Mark In Progress
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => handleMoveTask("todo")}
            >
              Mark To Do
            </Button>
          </>
        );

      default:
        return null;
    }
  };

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
              {isEditingTitle ? (
                <TextField
                  inputRef={titleRef}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={saveChanges}
                  onKeyDown={(e) => handleKeyDown(e as any, "title")}
                  fullWidth
                  size="small"
                  autoFocus
                />
              ) : (
                <Typography
                  variant="subtitle1"
                  className="font-bold cursor-pointer"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {task.title}
                </Typography>
              )}

              {isEditingDescription ? (
                <TextField
                  inputRef={descriptionRef}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  onBlur={saveChanges}
                  onKeyDown={(e) => handleKeyDown(e as any, "description")}
                  fullWidth
                  size="small"
                  multiline
                  autoFocus
                />
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="cursor-pointer"
                  onClick={() => setIsEditingDescription(true)}
                >
                  {task.description || "No description"}
                </Typography>
              )}

              <Stack direction="column" spacing={1} className="mt-2">
                {renderButtons()}
              </Stack>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
