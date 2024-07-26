import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  createProject,
  deleteProject,
  editProject,
  getProjects,
} from "../queries/project";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export function useProjects({
  onProjectCreateSuccess,
  onProjectEditSuccess,
} = {}) {
  const { currentUser } = useContext(AuthContext);

  const {
    isPending: projectsLoading,
    data: projects,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: ["projects", currentUser.uid],
    queryFn: () => getProjects(currentUser.uid),
  });

  const { isPending: isCreatingProject, mutate: mutateProjectCreation } =
    useMutation({
      mutationFn: createProject,
      onSuccess: () => {
        refetchProjects();
        onProjectCreateSuccess?.();
        toast.success("Project created successfully.");
      },
    });

  const { isPending: isDeletingProject, mutate: mutateProjectDeletion } =
    useMutation({
      mutationFn: deleteProject,
      onSuccess: () => {
        refetchProjects();
        toast.success("Project deleted successfully.");
      },
    });

  const editProjectMutation = useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      refetchProjects();
      onProjectEditSuccess?.();
      toast.success("Project updated successfully");
    },
  });

  return {
    projectsLoading,
    projects,
    isCreatingProject,
    mutateProjectCreation,
    isDeletingProject,
    mutateProjectDeletion,
    editProjectMutation,
  };
}
