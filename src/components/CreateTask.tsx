import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

const CreateTask = () => {
  const { tasks, addTask } = useTaskContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleAddTask = () => {
    const newErrors: { title?: string; description?: string } = {};

    // Validations
    if (!title.trim()) {
      newErrors.title = "Title cannot be empty.";
    } else if (tasks.some((task) => task.title === title)) {
      newErrors.title = "Task with this title already exists.";
    }

    if (!description.trim()) {
      newErrors.description = "Description cannot be empty.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addTask({
      id: uuidv4(),
      title,
      description,
      status: "todo",
    });

    setTitle("");
    setDescription("");
    setErrors({});
  };

  return (
    <Box className="p-4 border rounded-lg bg-gray-50 shadow-md max-w-lg mx-auto">
      <Typography variant="h5" gutterBottom>
        Create New Task
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={Boolean(errors.title)}
        helperText={errors.title}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={Boolean(errors.description)}
        helperText={errors.description}
        margin="normal"
        multiline
        rows={3}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        className="mt-4"
      >
        Add Task
      </Button>
    </Box>
  );
};

export default CreateTask;
