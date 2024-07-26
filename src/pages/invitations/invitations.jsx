import { DataGrid } from "@mui/x-data-grid";
import InviteMemberModal from "./components/invite-member-modal";
import { useInvitations } from "../../hooks/use-invitation";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Close, Done } from "@mui/icons-material";
import "./invitations.scss";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Invitations() {
  const { currentUser } = useContext(AuthContext);
  const { invitesQuery, acceptInviteMutation, rejectInvitationMutation, deleteInvitationMutation } = useInvitations();

  const handleDelete = async (invitationId) => {
    await deleteInvitationMutation.mutate(invitationId);
  };

  return (
    <div className="invitation">
      <div className="mainContainer">
        <div className="invitationContainer">
          <div className="header">
            <h1><b>Invitations</b></h1>
            <InviteMemberModal />
          </div>
          <br />
          <div className="content">
            <DataGrid
              rows={invitesQuery.data ?? []}
              columns={[
                {
                  headerName: "Project name",
                  renderCell: ({ row }) => row.project.name,
                  width: 300,
                },
                {
                  field: "status",
                  headerName: "Status",
                  width: 300,
                },
                {
                  field: "sender",
                  headerName: "Sender",
                  renderCell: ({ value }) => value.email,
                  width: 400,
                },
                {
                  field: "receiver",
                  headerName: "Receiver",
                  renderCell: ({ value }) => value.email,
                  width: 400,
                },
                {
                  field: "id",
                  headerName: "",
                  width: 300,
                  renderCell: ({ row }) => {
                    const isReceiver = row.receiver.id === currentUser.uid;

                    if (isReceiver && row.status === "PENDING") {
                      return (
                        <div className="flex items-center justify-center size-full gap-2">
                          <Button
                            disabled={acceptInviteMutation.isPending}
                            size="small"
                            color="success"
                            startIcon={<Done />}
                            onClick={() => {
                              acceptInviteMutation.mutate({
                                userId: currentUser.uid,
                                id: row.id,
                              });
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            disabled={rejectInvitationMutation.isPending}
                            size="small"
                            color="error"
                            startIcon={<Close />}
                            onClick={() => {
                              rejectInvitationMutation.mutate({
                                userId: currentUser.uid,
                                id: row.id,
                              });
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      );
                    }

                    return (
                      <Button
                        disabled={deleteInvitationMutation.isPending}
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </Button>
                    );
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
