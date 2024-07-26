import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";


export default function AddMember({projectId}) {
  const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);






  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
  };

  const submitData = (event) => {
     console.log(id)
  };

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
        Add Member
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex items-center justify-center w-full h-full">
          <div className="card rounded-2xl min-w-6/12 flex flex-col items-center justify-center p-5">
            <Typography id="modal-modal-title" variant="h6" component="h2" className="hidden">
              Add a Member
            </Typography>
            <div className="w-full text-xl font-light text-black text-center flex items-center justify-center p-3 mb-4">- Create New Project -</div>
            <form
              onSubmit={submitData}
              className="flex flex-col items-center justify-center w-full space-y-3 font-light px-5"
            >
              <TextField
                label="Project Name"
                value={id}
                onChange={(e) => setId(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Box className="flex flex-row items-center justify-center w-full space-x-5 pt-2">
                <Button
                  disabled={isCreatingProject}
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#582498",
                    "&:hover": { backgroundColor: "#3f196e" },
                  }}
                >
                  Submit
                </Button>
                <Button onClick={handleClose} variant="outlined" color="secondary">
                  Cancel
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
