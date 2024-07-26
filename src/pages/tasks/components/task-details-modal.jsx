import { RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

export default function TaskDetailsModal({ task }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<RemoveRedEye />}
        variant="contained"
        fullWidth
      >
        View Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>{task.name}</b>
          </Typography>

          <div className="underline text-lg mb-1">Task Checklist</div>
          <p>- {task.checklist}</p>
        </Box>
      </Modal>
    </>
  );
}
