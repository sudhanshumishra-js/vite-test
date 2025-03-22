import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

const CreateTask = () => {
  const { tasks, addTask } = useTaskContext();
  const [open, setOpen] = useState(false);
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
    setOpen(false);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        onClick={() => setOpen(true)}
        className="mb-4 cursor-pointer"
      >
        <IconButton
          size="small"
          color="error"
          className=" text-red-500 hover:text-red-600 transition"
        >
          <AddIcon fontSize="medium" />
        </IconButton>
        <Typography
          variant="body1"
          className="font-medium text-gray-500 hover:text-red-500 "
        >
          Create Task
        </Typography>
      </Stack>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 border rounded-lg bg-white shadow-md max-w-lg w-full">
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
          <Stack
            className="flex justify-end mt-4 space-x-2"
            direction={"row"}
            gap={2}
          >
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddTask}>
              Add Task
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTask;
