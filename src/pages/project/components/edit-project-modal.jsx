import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProjectSchema } from "../../../schema/project";
import "./create-project-modal.scss";
import { AuthContext } from "../../../context/AuthContext";
import { useProjects } from "../../../hooks/use-projects";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

export default function EditProjectModal({ project }) {
  console.log(project)
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // Initialize dates using Day.js
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  const [startingDate, setStartingDate] = useState(
    project.startingDate ? dayjs.unix(project.startingDate.seconds) : dayjs()
  );
  const [deadline, setDeadline] = useState(
    project.deadline ? dayjs.unix(dateToTimestamp(project.deadline).seconds) : dayjs()
  );

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  function dateToTimestamp(date) {
    const seconds = Math.floor(date.getTime() / 1000);
    const nanoseconds = (date.getTime() % 1000) * 1e6;
    const timestamp = { seconds, nanoseconds };
    return timestamp;
  }

  const { editProjectMutation } = useProjects({
    onProjectEditSuccess: () => {
      console.log("Project edited successfully");
      handleClose();
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitData = (event) => {
    event.preventDefault();
    const deadlineMillis = deadline.toDate();



    const data = {
      projectId: project.id,
      name: name || "",
      userId: currentUser?.uid || "",
      description: description || "",
      startingDate: startingDate.toDate(),
      deadline: deadline.toDate()
    };
    console.log(data);
    editProjectMutation.mutate(data, {
      onError: (error) => {
        console.error("Error editing project:", error);
      },
    });
  };

  return (
    <>
      <Button onClick={handleOpen} startIcon={<EditIcon />}>
        Edit Project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex items-center justify-center w-full h-full">
          <div className="card rounded-2xl min-w-4/12 flex flex-col items-center justify-center p-5">
            <Typography id="modal-modal-title" variant="h6" component="h2" className="hidden">
              Edit Project
            </Typography>
            <div className="w-full text-xl font-light text-black text-center flex items-center justify-center p-3 mb-4">- Edit Project -</div>
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

