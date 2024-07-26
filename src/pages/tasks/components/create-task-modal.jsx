import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../../../schema/task";
import { Box, Button, Modal, Typography, MenuItem, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useTasks } from "../../../hooks/use-tasks";
import { AuthContext } from "../../../context/AuthContext";
import { getProjectMembers } from "../../../queries/project";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function CreateTaskModal({ members }) {
  const [open, setOpen] = useState(false);
  const { projectId } = useParams();


  console.log(members)
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState(dayjs().add(1, 'month'));
  const [startDate, setStartDate] = useState(dayjs());
  const [checklist, setChecklist] = useState('');

  const { control, reset, handleSubmit } = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      status: "Not Started",
    },
  });


  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    reset();
  }

  const { isCreating, mutateTaskCreation } = useTasks({
    onTaskCreateSuccess: () => {
      reset();
      handleClose();
    },
  });

  const submitData = (event) => {
    event.preventDefault();
    mutateTaskCreation({
      createdBy: currentUser.uid,
      name,
      startDate: startDate.toDate(),
      deadline: deadline.toDate(),
      projectId,
      priority,
      status,
      checklist,
      assignedTo
    });
  };

  return (
    <>
      <div onClick={handleOpen}
        startIcon={<AddIcon />} className="hover:bg-purple-600 transition-all flex flex-col items-center p-5 py-7 bg-black rounded-2xl h-3/6 w-3/12 justify-center">
        <svg
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Add Task</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">be managed and organized</span>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="flex items-center justify-center w-full h-full"
          >
            <div className="card rounded-2xl w-5/12 flex flex-col items-center justify-center p-5">
              <div className="w-full text-xl font-light text-white text-center flex items-center justify-center p-3 mb-4">- Create New Task -</div>
              <form
                onSubmit={submitData}
                className="flex flex-col items-center justify-center w-full space-y-3 font-light px-5"
              >
                <TextField
                  label="Task Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id="assignedto">Assigned To</InputLabel>
                  <Select
                    labelId="assignedto"
                    value={assignedTo}
                    label="Assigned To"
                    onChange={(e) => setAssignedTo(e.target.value)}
                  >
                    {members.map((member) => (
                      <MenuItem key={member.id} value={member.id}>
                        {member.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Stuck">Stuck</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="priorityLabel">Priority</InputLabel>
                  <Select
                    labelId="priorityLabel"
                    value={priority}
                    label="Priority"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs} className="w-full" fullWidth>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} className="w-full" fullWidth />}
                  />
                  <DatePicker
                    label="Deadline"
                    value={deadline}
                    onChange={(newValue) => setDeadline(newValue)}
                    renderInput={(params) => <TextField {...params} className="w-full" fullWidth />}
                  />
                </LocalizationProvider>
                <TextField
                  label="Checklist"
                  value={checklist}
                  onChange={(e) => setChecklist(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <Box className="flex flex-row items-center justify-center w-full space-x-5 pt-2">
                  <Button
                    disabled={isCreating}
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
            </div>

          </Box>
        </Modal>
      </>
      );
}
