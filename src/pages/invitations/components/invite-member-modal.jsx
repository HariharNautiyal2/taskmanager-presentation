import { Box, Button, Modal, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useProjects } from "../../../hooks/use-projects";
import { AuthContext } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { createInvitationSchema } from "../../../schema/invitation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputDropdown } from "../../../component/form/form-input-dropdown";
import { FormInputText } from "../../../component/form/form-input-text";
import { useInvitations } from "../../../hooks/use-invitation";

export default function InviteMemberModal() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { projects } = useProjects();

  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(createInvitationSchema),
    defaultValues: {
      sender: currentUser.uid,
    },
  });

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const { createInvitationMutation } = useInvitations({
    onInvitationCreate: () => {
      reset();
      handleClose();
    },
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<AddIcon />}
        variant="contained"
        sx={{
          backgroundColor: "#582498",
          "&:hover": { backgroundColor: "#3f196e" },
        }}
      >
        Invite member
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Invite member
          </Typography>
          <form
            onSubmit={handleSubmit((data) => {
              createInvitationMutation.mutate(data);
            })}
            className="modal-form"
          >
            <FormInputDropdown
              name="projectId"
              control={control}
              label="Project"
              options={
                projects
                  ? projects.map((p) => ({
                      label: p.name,
                      value: p.id,
                    }))
                  : []
              }
            />

            <FormInputText
              name="receiverEmail"
              control={control}
              label="Email"
            />

            <Box className="button-container">
              <Button
                disabled={createInvitationMutation.isPending}
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#582498",
                  "&:hover": { backgroundColor: "#3f196e" },
                }}
              >
                Submit
              </Button>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
