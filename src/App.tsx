import TaskProvider from "./context/TaskContext";
import ErrorBoundary from "./global/ErrorBoundary";
import TaskBoard from "./components/TaskBoard";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <TaskProvider>
      <ErrorBoundary>
        <Container maxWidth="md" className="p-4">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            className="text-3xl font-bold text-amber-600"
          >
            To-Do List
          </Typography>
          <TaskBoard />
        </Container>
      </ErrorBoundary>
    </TaskProvider>
  );
}

export default App;
