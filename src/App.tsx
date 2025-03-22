import TaskProvider from "./context/TaskContext";
import ErrorBoundary from "./global/ErrorBoundary";
import TaskBoard from "./components/TaskBoard";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <TaskProvider>
      <ErrorBoundary>
        <Container maxWidth="lg" className="p-4 ">
          <Typography variant="h4" align="center" gutterBottom className="mt-3">
            To-Do List
          </Typography>
          <TaskBoard />
        </Container>
      </ErrorBoundary>
    </TaskProvider>
  );
}

export default App;
