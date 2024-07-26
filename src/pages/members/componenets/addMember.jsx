import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { validateUserById,addMemberById } from "../../../queries/project";

export default function AddMember({ projectId }) {

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  




  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const submitData = async (event) => {
    event.preventDefault();
    console.log(id)
    if (await validateUserById(id)) {
      addMemberById(projectId, id).then(() => {
        handleClose();
       })
    }
  };

  return (
    <>
      <div onClick={handleOpen} className="hover:bg-purple-600 transition-all flex flex-col items-center p-5 py-7 bg-black rounded-2xl h-3/6 w-3/12 justify-center">
        <svg className="w-24 h-24 mb-3 rounded-full shadow-lg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
          <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Add Member</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Add Member by their id</span>
        <div className="flex mt-4 md:mt-6">
          <addMember className="w-full" />
        </div>
      </div>
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
            <div className="w-full text-xl font-light text-white text-center flex items-center justify-center p-3 mb-4">- Add New Member -</div>
            <div
              className="flex flex-col items-center justify-center w-full space-y-3 font-light px-5"
            >
              <TextField
                label="User Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Box className="flex flex-row items-center justify-center w-full space-x-5 pt-2">
                <Button
                  variant="contained"
                  onClick={submitData}
                  sx={{
                    backgroundColor: "#582498",
                    "&:hover": { backgroundColor: "#3f196e" },
                  }}
                >
                  Add
                </Button>
                <Button onClick={handleClose} variant="outlined" color="secondary">
                  Cancel
                </Button>
              </Box>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
