import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllTasks, createTask, deleteTask, editTask, getProjectTasks } from "../queries/task";
import { toast } from "react-toastify";

export function useTasks({ projectId, onTaskCreateSuccess, onTaskEditSuccess } = {}) {
  const {
    isPending: isLoadingTasks,
    data: tasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: projectId ? ["tasks", projectId] : ["tasks"],
    queryFn: () => projectId ? getProjectTasks(projectId) : getAllTasks(),
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
      console.error("Error fetching tasks:", error);
    },
  });

  const { isPending: isCreating, mutate: mutateTaskCreation } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      refetchTasks();
      onTaskCreateSuccess?.();
      toast.success("Task created successfully.");
    },
  });

  const { isPending: isDeleting, mutate: mutateTaskDeletion } = useMutation({
    mutationFn: ({ taskId, projectId }) => deleteTask(taskId, projectId),
    onSuccess: () => {
      refetchTasks();
      toast.success("Task deleted successfully.");
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      refetchTasks();
      onTaskEditSuccess?.();
      toast.success("Task updated successfully.");
    },
  });

  return {
    isCreating,
    mutateTaskCreation,
    isLoadingTasks,
    tasks,
    isDeleting,
    mutateTaskDeletion,
    editTaskMutation,
  };
}
