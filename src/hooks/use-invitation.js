import { useMutation, useQuery } from "@tanstack/react-query";
import {
  acceptInvitation,
  createInvitation,
  getInvitations,
  rejectInvitation,
  deleteInvitation,
} from "../queries/invitation";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useInvitations({ onInvitationCreate } = {}) {
  const { currentUser } = useContext(AuthContext);

  const invitesQuery = useQuery({
    queryKey: ["invites", currentUser.uid],
    queryFn: () => getInvitations(currentUser.uid),
  });

  const createInvitationMutation = useMutation({
    mutationFn: createInvitation,
    onSuccess: () => {
      invitesQuery.refetch();
      onInvitationCreate();
      toast.success("Member invited successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    },
  });

  const acceptInviteMutation = useMutation({
    mutationFn: acceptInvitation,
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    },
    onSuccess: async () => {
      await invitesQuery.refetch();
      toast.success("Invite accepted");
    },
  });

  const rejectInvitationMutation = useMutation({
    mutationFn: rejectInvitation,
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    },
    onSuccess: async () => {
      await invitesQuery.refetch();
      toast.success("Invite rejected");
    },
  });

  const deleteInvitationMutation = useMutation({
    mutationFn: deleteInvitation,
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    },
    onSuccess: async () => {
      await invitesQuery.refetch();
      toast.success("Invitation deleted successfully.");
    },
  });

  return {
    createInvitationMutation,
    invitesQuery,
    acceptInviteMutation,
    rejectInvitationMutation,
    deleteInvitationMutation,
  };
}
