import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import "./create-project-modal.scss";
import { AuthContext } from "../../../context/AuthContext";
import { useProjects } from "../../../hooks/use-projects";


export default function CreateProjectModal() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startingDate, setStartingDate] = useState(dayjs());
  const [deadline, setDeadline] = useState(dayjs().add(1, 'month'));

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const { isCreatingProject, mutateProjectCreation } = useProjects({
    onProjectCreateSuccess: () => {
      console.log("Project created successfully");
      setName('');
      setDescription('');
      handleClose();
    },
  });

  function changeValidDateFormat({seconds,nanoseconds}) {
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
    return date;
  } 

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
  };

  const submitData = (event) => {
    const startingDateMillis = startingDate.valueOf();
    const deadlineMillis = deadline.valueOf();
    event.preventDefault();
    mutateProjectCreation({
      userId: currentUser.uid,
      name,
      description,
      startingDate: startingDate.toDate(),
      deadline: deadline.toDate(),
    });
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
        Create project
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
              Create New Project
            </Typography>
            <div className="w-full text-xl font-light text-white text-center flex items-center justify-center p-3 mb-4">- Create New Project -</div>
            <form
              onSubmit={submitData}
              className="flex flex-col items-center justify-center w-full space-y-3 font-light px-5"
            >
              <TextField
                label="Project Name"
                value={name}
                onChange={handleNameChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Project Description"
                value={description}
                onChange={handleDescriptionChange}
                variant="outlined"
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} className="w-full" fullWidth>
                <DatePicker
                  label="Starting Date"
                  value={startingDate}
                  onChange={(newValue) => setStartingDate(newValue)}
                  renderInput={(params) => <TextField {...params} className="w-full" fullWidth />}
                />
                <DatePicker
                  label="Deadline"
                  value={deadline}
                  onChange={(newValue) => setDeadline(newValue)}
                  renderInput={(params) => <TextField {...params} className="w-full" fullWidth />}
                />
              </LocalizationProvider>
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
